import Parser, { QueryCapture } from "web-tree-sitter";

export interface MyParameter {
  name: string;
  type: string;
  predefinedType: boolean;
}

export interface MyReturnType {
  type: string;
  predefinedType: boolean;
}

export interface MyFunction {
  name: string;
  parameters: MyParameter[];
  returnType: MyReturnType;
}

export interface MyInterface {
  name: string;
}

export interface MyFile {
  filename: string;
  path: string[];
  myInterfaces: MyInterface[];
  myFunctions: MyFunction[];
}

export interface Codebase {
  myFiles: MyFile[];
}

const buildParameter = (capture: QueryCapture): MyParameter[] => {
  const functionParameters = capture.node.children[1]?.children[2]?.children[0]?.children;
  const myParameters = [];

  for(let i=1; i < functionParameters.length - 1; i+=2) {
    myParameters.push({
      name: functionParameters[i]?.children[0]?.text,
      type: functionParameters[i]?.children[1]?.children[1]?.text,
      predefinedType: functionParameters[i]?.children[1]?.children[1]?.type === 'predefined_type'
    });
  }

  return myParameters;
};

const buildReturnType = (capture: QueryCapture): MyReturnType => {
  const returnValue = capture.node.children[1]?.children[2]?.children[1]?.children[1];

  if (returnValue) {
    return {
      type: returnValue.children[0]?.type,
      predefinedType: returnValue.type === 'predefined_type',
    }
  }

  return {
    type: 'void',
    predefinedType: true,
  }
}

const buildFunction = (capture: QueryCapture): MyFunction => {
  return {
    name: capture.node.children[1]?.children[0]?.text,
    parameters: buildParameter(capture),
    returnType: buildReturnType(capture)
  };
};

const buildInterface = (capture: QueryCapture): MyInterface => {
  return {
    name: capture.node.children[1]?.text
  };
};

const buildCodebase = (captures: QueryCapture[]): Codebase => {
  const myFunctions: MyFunction[] = [];
  const myInterfaces: MyInterface[] = [];

  captures.forEach(capture => {
    if (capture.name === 'definition.interface') {
      myInterfaces.push(buildInterface(capture));
    } else if (capture.name === 'definition.function') {
      myFunctions.push(buildFunction(capture));
    }
  });

  return {
    myFiles: [
      {
        filename: 'index.tsx',
        path: [],
        myFunctions,
        myInterfaces
      }
    ]
  };
}

export const parse = async (code: string): Promise<Codebase> => {
  await Parser.init();
  const parser = new Parser();

  const Tsx = await Parser.Language.load('/tree-sitter-languages/tree-sitter-tsx.wasm');
  parser.setLanguage(Tsx);

  const typesQuery = `
    [
      (interface_declaration) @definition.interface
      (lexical_declaration (variable_declarator name:(identifier) value:(arrow_function))) @definition.function
    ]
  `;
  const tree = parser.parse(code);
  const query = Tsx.query(typesQuery);

  return buildCodebase(query.captures(tree.rootNode));
};
