import { useEffect, useState } from 'react';

import './App.css';

import { Codebase, parse } from './utils/parser';
import { UiFunctionList } from './ui/UiFunction';
import { UiTypeGrid } from './ui/UiType';

// import { repoService } from './utils/repoService';

const exampleCode = `
export interface MyFunction {
  name: string;
  parameters: MyParameter[];
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

const getWasmFile = (language: Language): void => {
  if (language === 'javascript') {
    return '/assets/TreeSitter/tree-sitter-javascript.wasm'
  } else if (language === 'typescript') {
    return '/assets/TreeSitter/tree-sitter-tsx.wasm'
  }
};

const func2 = (language: string, b: number): number => {};
`;

const emptyCodebase = {
  myFunctions: [],
  myInterfaces: [],
};

export function App() {
  const [codebase, setCodebase] = useState<Codebase>(emptyCodebase);

  useEffect(() => {
    const getCodebase = async () => {
      const codebase = await parse(exampleCode);
      setCodebase(codebase);
    };

    getCodebase();
  }, [])

  return (
    <>
      <h1>Colorful types</h1>

      <UiTypeGrid myInterfaces={codebase.myInterfaces} />

      <UiFunctionList myFunctions={codebase.myFunctions} />
    </>
  )
}
