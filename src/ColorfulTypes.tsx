import { ReactNode, useEffect, useState } from 'react';

import './App.css';
import styles from './App.module.css';

import { Codebase, MyFile, parse } from './utils/parser';
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

const emptyCodebase = { myFiles: {} };

export function ColorfulTypes(): ReactNode {
  const githubRepo = {
    org: 'minimalistOrg',
    repo: 'colorfulTypes',
  }
  // 'https://github.com/MinJieLiu/react-photo-view',
  // 'https://github.com/microsoft/fluentui',
  // 'https://github.com/novuhq/novu',
  // 'https://github.com/illacloud/illa-builder',
  // 'https://github.com/microsoft/TypeScript',
  // 'https://github.com/minimalistOrg/minimalist-ide',
  // 'https://github.com/minimalistOrg/minimalistIdeV2',
  // 'https://github.com/tonybaloney/vscode-pets',

  const [codebase, setCodebase] = useState<Codebase>(emptyCodebase);
  const [selectedFile, setSelectedFile] = useState<MyFile | undefined>();

  useEffect(() => {
    const getCodebase = async (): Promise<void> => {
      const repoContent = await repoService.getRepo(githubRepo);

      const codebase = await parse(
        repoContent,
        ['.tsx', '.ts'],
      );
      setCodebase(codebase);
    };

    getCodebase();
  }, [])

  return (
    <>
      <h1>Colorful types</h1>
      <h2>{githubRepo.org}/{githubRepo.repo}</h2>

      <div className={styles.uiLayout}>
        <div className={styles.uiCodebase}>
          {
            Object.entries(codebase.myFiles).map(([filename, myFile]) => {
              if(myFile.myTypes.length > 0 || myFile.myFunctions.length > 0) {
                return (
                  <UiFile
                    myFile={myFile}
                    key={filename}
                    isSelected={myFile === selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                );
              } else {
                return null;
              }
            })
          }
        </div>

        <div className={styles.uiSelectedFile}>
          {selectedFile && (
            <UiFile myFile={selectedFile} isSelected={false} zoomLevel={2} />
          )}
        </div>
      </div>
    </>
  )
}
