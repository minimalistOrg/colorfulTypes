import { useEffect, useState } from 'react';

import './App.css';
import styles from './App.module.css';

import { Codebase, parse } from './utils/parser';
import { UiFile } from './ui/UiFile';

import { repoService } from './utils/repoService';

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

const emptyCodebase = { myFiles: [] };

export function App() {
  const [codebase, setCodebase] = useState<Codebase>(emptyCodebase);

  useEffect(() => {
    const getCodebase = async () => {
      const repoContent = await repoService.getRepo(
        'https://github.com/minimalistOrg/minimalist-ide',
        ['.tsx', '.ts'],
      );

      const codebase = await parse(repoContent);
      setCodebase(codebase);
    };

    getCodebase();
  }, [])

  return (
    <>
      <h1>Colorful types</h1>

      <div className={styles.uiCodebase}>
        {codebase.myFiles.map(myFile => (
          <UiFile myFile={myFile} key={myFile.filename} />
        ))}
      </div>
    </>
  )
}
