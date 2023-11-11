import { useEffect, useState } from 'react';

import './App.css';
import styles from './App.module.css';

import { Codebase, parse } from './utils/parser';
import { UiFile } from './ui/UiFile';

import { repoService } from './utils/repoService';

// const exampleCode = `
// export const ImageList: React.FC = ({ children }) => {
//   return <div className="flex flex-wrap items-center my-6">{children}</div>;
// };
// `;
// export interface ISliderPortalProps extends React.HTMLAttributes<HTMLDivElement> {
//   container?: HTMLElement;
// }

// function noParams(x: number, a: string): string {}
// `;

// const noParams = (x: string, b: number): string => {};

// const exampleCode = `
// export const CodeBlock = (
//   { name, blockParameters, ast }:
//   { name: string, blockParameters: string, ast: string }
// ) => {}
// `;

// const exampleCode = `
// export const CodeBlock = (
//   { name, blockParameters, ast }: TCodeBlock
// ) => {}
// `;

// const exampleCode = `
// export interface MyFunction {
//   name: string;
//   parameters: MyParameter[];
//   returnType?: MyReturnType;
// }

// export interface MyInterface {
//   name: string;
// }

// export interface Codebase {
//   myInterfaces: MyInterface[];
//   myFunctions: MyFunction[];
// }

// const getWasmFile = (language: Language): void => {
//   if (language === 'javascript') {
//     return '/assets/TreeSitter/tree-sitter-javascript.wasm'
//   } else if (language === 'typescript') {
//     return '/assets/TreeSitter/tree-sitter-tsx.wasm'
//   }
// };

// const func2 = (language: string, b: number): void => {};
// `;

const emptyCodebase = { myFiles: [] };

export function App() {
  const [codebase, setCodebase] = useState<Codebase>(emptyCodebase);

  useEffect(() => {
    const getCodebase = async () => {
      const repoContent = await repoService.getRepo(
        // 'https://github.com/MinJieLiu/react-photo-view',
        // 'https://github.com/microsoft/fluentui',
        // 'https://github.com/novuhq/novu',
        // 'https://github.com/illacloud/illa-builder',
        // 'https://github.com/microsoft/TypeScript',
        // 'https://github.com/minimalistOrg/colorfulTypes',
        // 'https://github.com/minimalistOrg/minimalist-ide',
        // 'https://github.com/minimalistOrg/minimalistIdeV2',
        'https://github.com/tonybaloney/vscode-pets',
        ['.tsx', '.ts'],
      );

      // const repoContent = {
      //   'index.ts': exampleCode
      // };

      const codebase = await parse(repoContent);
      setCodebase(codebase);
    };

    getCodebase();
  }, [])

  return (
    <>
      <h1>Colorful types</h1>

      <div className={styles.uiCodebase}>
        {codebase.
          myFiles.
          filter(myFile =>
            myFile.myInterfaces.length > 0 || myFile.myFunctions.length > 0
          ).
          map(myFile => (
            <UiFile myFile={myFile} key={myFile.filename} />
          ))}
      </div>
    </>
  )
}
