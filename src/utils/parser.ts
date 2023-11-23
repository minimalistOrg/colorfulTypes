import Parser, { QueryCapture, SyntaxNode } from "web-tree-sitter";
import { RepoContent } from "./repoService";

export interface MyParameter {
  name: string;
  type: string;
  predefinedType: boolean;
}

export interface MyReturnType {
  type: string;
  predefinedType: boolean;
}

export interface CodebasePosition {
  start: Parser.Point;
  end: Parser.Point;
}

export interface MyFunction {
  name: string;
  parameters: MyParameter[];
  returnType: MyReturnType;
  codebasePosition: CodebasePosition;
}

export interface MyType {
  kind: 'type' | 'enum' | 'interface' | 'class';
  name: string;
  codebasePosition: CodebasePosition;
}

export interface MyFile {
  filename: string;
  myTypes: MyType[];
  myFunctions: MyFunction[];
}

export interface Codebase {
  myFiles: Record<string, MyFile>;
}

const buildParameters = (functionParameters: SyntaxNode[]): MyParameter[] => {
  return functionParameters.
    filter(node => node.type === 'required_parameter').
    map(node => (
      {
        name: node?.children[0]?.text,
        type: node?.children[1]?.children[1]?.text || "any",
        predefinedType: node?.children[1]?.children[1]?.type === 'predefined_type'
      }
    ))
};

const buildReturnType = (returnNode: SyntaxNode | undefined): MyReturnType => {
  if (returnNode && returnNode.children[1]) {
    return {
      type: returnNode.children[1].text,
      predefinedType: returnNode.children[1].type === 'predefined_type',
    };
  }

  return {
    type: 'void',
    predefinedType: true,
  };
}

export const buildArrowFunction = (capture: QueryCapture): MyFunction => {
  const functionParameters = capture.
    node.
    children.find(node => node.type === 'arrow_function')?.
    children.find(node => node.type === 'formal_parameters')?.
    children || [];
  const returnNode = capture.
    node.
    children.find(node => node.type === 'arrow_function')?.
    children.find(node => node.type === 'type_annotation');

  return {
    name: capture.node.children.find(node => node.type === 'identifier')?.text || 'ERROR',
    parameters: buildParameters(functionParameters),
    returnType: buildReturnType(returnNode),
    codebasePosition: {
      start: capture.node.startPosition,
      end: capture.node.endPosition,
    },
  };
};

export const buildFunction = (capture: QueryCapture): MyFunction => {
  const functionParameters = capture.
    node.
    children.find(node => node.type === 'formal_parameters')?.
    children || [];
  const returnNode = capture.node.children.find(node => node.type === 'type_annotation');

  return {
    name: capture.node.children.find(node => node.type === 'identifier')?.text || 'ERROR',
    parameters: buildParameters(functionParameters),
    returnType: buildReturnType(returnNode),
    codebasePosition: {
      start: capture.node.startPosition,
      end: capture.node.endPosition,
    },
  };
};

export const buildInterface = (capture: QueryCapture): MyType => {
  return {
    kind: capture.name.split('.')[1] as MyType['kind'],
    name: capture.node.children.find(node => node.type === 'type_identifier')?.text || 'ERROR',
    codebasePosition: {
      start: capture.node.startPosition,
      end: capture.node.endPosition,
    },
  };
};

export const buildEnum = (capture: QueryCapture): MyType => {
  return {
    kind: 'enum',
    name: capture.node.children.find(node => node.type === 'identifier')?.text || 'ERROR',
    codebasePosition: {
      start: capture.node.startPosition,
      end: capture.node.endPosition,
    },
  };
};

const buildFile = (captures: QueryCapture[], filename: string): MyFile => {
  const myFunctions: MyFunction[] = [];
  const myTypes: MyType[] = [];

  captures.forEach(capture => {
    if (
      capture.name === 'definition.interface' ||
      capture.name === 'definition.type' ||
      capture.name === 'definition.class'
    ) {
      myTypes.push(buildInterface(capture));
    } else if (capture.name === 'definition.enum') {
      myTypes.push(buildEnum(capture));
    } else if (capture.name === 'definition.arrowFunction') {
      myFunctions.push(buildArrowFunction(capture));
    } else if (capture.name === 'definition.function') {
      myFunctions.push(buildFunction(capture));
    }
  });

  return {
    filename: filename,
    // path: [],
    myFunctions,
    myTypes: myTypes.sort((a, b) => a.name < b.name ? -1 : 1)
  };
}

export const parse = async (repoContent: RepoContent): Promise<Codebase> => {
  await Parser.init();
  const parser = new Parser();

  const Tsx = await Parser.Language.load('/tree-sitter-languages/tree-sitter-tsx.wasm');
  parser.setLanguage(Tsx);

  const typesQuery = `
    [
      (enum_declaration) @definition.enum
      (function_declaration) @definition.function
      (interface_declaration) @definition.interface
      (type_alias_declaration) @definition.type
      (variable_declarator name:(identifier) value:(arrow_function)) @definition.arrowFunction
      (class_declaration) @definition.class
      (abstract_class_declaration) @definition.class
    ]
  `;

  const myFiles = Object.entries(repoContent).reduce(
    (allFiles, repoEntry) => {
      const tree = parser.parse(repoEntry[1]);
      const query = Tsx.query(typesQuery);

      allFiles[repoEntry[0]] = buildFile(query.captures(tree.rootNode), repoEntry[0]);
      return allFiles;
    },
    {} as Record<string, MyFile>
  );

  return { myFiles };
};
