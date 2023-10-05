import { TarReader } from '@gera2ld/tarjs';
import Parser from 'web-tree-sitter';

const getRepositoryFiles = async (url: URL, extensions: string[], callback: (source: string) => any) => {
  const urlParts = url.pathname.split('/');
  const ref = urlParts[4] || 'main'

  const archiveLink = `https://codeload.github.com/${urlParts[1]}/${urlParts[2]}/legacy.tar.gz/refs/heads/${ref}`;
  const response = await fetch(archiveLink)

  const decompressedStream = response.body?.pipeThrough(new DecompressionStream("gzip"));

  const blob = await new Response(decompressedStream).blob()
  const reader = new TarReader();
  const fileInfos = await reader.readFile(blob);

  const sourceFileInfos = fileInfos.filter(fileInfo => extensions.some(extension => fileInfo.name.endsWith(extension)))
  let tree : Parser.Tree | undefined;
  sourceFileInfos.forEach((fileInfo) => tree = callback(reader.getTextFile(fileInfo.name)))

  // return sourceFileInfos.map(fileInfo => reader.getTextFile(fileInfo.name))
  return tree;
}

export const repoService = {
  getProject: async (urlString: string, extensions: string[], callback: (source: string) => any) => {
    const url = new URL(urlString);
    const tree = await getRepositoryFiles(url, extensions, callback);

    return tree;
  }
}
