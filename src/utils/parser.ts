import Parser, { QueryCapture } from "web-tree-sitter";

export interface MyArgument {
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
  arguments: MyArgument[];
  returnType?: MyReturnType;
}

const buildArgument = (capture: QueryCapture): MyArgument[] => {
  const functionArguments = capture.node.children[1]?.children[2]?.children[0]?.children;
  const myArguments = [];

  for(let i=1; i < functionArguments.length - 1; i+=2) {
    myArguments.push({
      name: functionArguments[i]?.children[0]?.text,
      type: functionArguments[i]?.children[1]?.children[1]?.text,
      predefinedType: functionArguments[i]?.children[1]?.children[1]?.type === 'predefined_type'
    });
  }

  return myArguments;
};

const buildReturnType = (capture: QueryCapture): MyReturnType | undefined => {
  const returnValue = capture.node.children[1]?.children[2]?.children[1]?.children[1];

  if (returnValue) {
    return {
      type: returnValue.children[0]?.type,
      predefinedType: returnValue.type === 'predefined_type'
    }
  }
}

const build = (capture: QueryCapture): MyFunction => {
  return {
    name: capture.node.children[1]?.children[0]?.text,
    arguments: buildArgument(capture),
    returnType: buildReturnType(capture)
  };
};

export const parse = async (code: string): Promise<MyFunction[]> => {
  await Parser.init();
  const parser = new Parser();

  const Tsx = await Parser.Language.load('/tree-sitter-languages/tree-sitter-tsx.wasm');
  parser.setLanguage(Tsx);

  const arrowFunctionQuery =
    "(lexical_declaration (variable_declarator name:(identifier) value:(arrow_function))) @definition.function";
  const tree = parser.parse(code);

  const query = Tsx.query(arrowFunctionQuery);
  return query.captures(tree.rootNode).map(build);
};
