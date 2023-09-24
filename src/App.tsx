import { useEffect } from 'react';
import Parser from 'web-tree-sitter'

import './App.css'

import { repoService } from './utils/repoService';

export function App() {
  useEffect(() => {
    const initTreeSitter = async () => {
      await Parser.init()
      const parser = new Parser()

      const Tsx = await Parser.Language.load('/tree-sitter-languages/tree-sitter-tsx.wasm');
      parser.setLanguage(Tsx)

      repoService.getProject('https://github.com/minimalistOrg/minimalistIdeV2');
      const sourceCode = 'let x = 1; console.log(x);';
      const tree = parser.parse(sourceCode);
    }

    initTreeSitter()
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}
