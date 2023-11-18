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
  name: string;
  codebasePosition: CodebasePosition;
}

export interface MyFile {
  filename: string;
  // path: string[];
  myTypes: MyType[];
  myFunctions: MyFunction[];
}

export interface Codebase {
  myFiles: MyFile[];
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
    name: capture.node.children.find(node => node.type === 'type_identifier')?.text || 'ERROR',
    codebasePosition: {
      start: capture.node.startPosition,
      end: capture.node.endPosition,
    },
  };
};

export const buildEnum = (capture: QueryCapture): MyType => {
  return {
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
    if (capture.name === 'definition.interface') {
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
    myTypes
  };
}

export const parse = async (repoContent: RepoContent): Promise<Codebase> => {
  await Parser.init();
  const parser = new Parser();

  const Tsx = await Parser.Language.load('/tree-sitter-languages/tree-sitter-tsx.wasm');
  parser.setLanguage(Tsx);

  const typesQuery = `
    [
      (interface_declaration) @definition.interface
      (variable_declarator name:(identifier) value:(arrow_function)) @definition.arrowFunction
      (function_declaration) @definition.function
      (enum_declaration) @definition.enum
    ]
  `;

  const files = Object.entries(repoContent).map(([filename, fileContent]) => {
    const tree = parser.parse(fileContent);
    const query = Tsx.query(typesQuery);

    return buildFile(query.captures(tree.rootNode), filename);
  });

  return { myFiles: files };
};
