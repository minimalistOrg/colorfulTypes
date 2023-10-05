import { useEffect } from 'react';

import './App.css'
import { parse } from './utils/parser';

// import { repoService } from './utils/repoService';

const exampleCode = `
export interface MyFunction {
  name: string;
  arguments: MyArgument[];
  returnType?: MyReturnType;
}

export interface MyInterface {
  name: string;
}

export interface Codebase {
  myInterfaces: MyInterface[];
  myFunctions: MyFunction[];
}

const noParams = (): void => {};

const getWasmFile = (language: Language) => {
  if (language === 'javascript') {
    return '/assets/TreeSitter/tree-sitter-javascript.wasm'
  } else if (language === 'typescript') {
    return '/assets/TreeSitter/tree-sitter-tsx.wasm'
  }
};

const func2 = (language: string, b: number) => {};
`;

export function App() {
  useEffect(() => {
    const getFunctions = async () => {
      const codebase = await parse(exampleCode);
      const x = 1;
    };

    getFunctions();
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}
