import { TarReader } from '@gera2ld/tarjs';

const getRepositoryFiles = async (url: URL, extensions: string[]) => {
  const urlParts = url.pathname.split('/');
  const ref = urlParts[4] || 'main'

  const archiveLink = `https://codeload.github.com/${urlParts[1]}/${urlParts[2]}/legacy.tar.gz/refs/heads/${ref}`;
  const response = await fetch(archiveLink)

  const decompressedStream = response.body?.pipeThrough(new DecompressionStream("gzip"));

  const blob = await new Response(decompressedStream).blob()
  const reader = new TarReader();
  const fileInfos = await reader.readFile(blob);

  const sourceFileInfos = fileInfos.filter(fileInfo => extensions.some(extension => fileInfo.name.endsWith(extension)))
  // sourceFiles.map(fileInfo => reader.getTextFile(fileInfo.name))

  return sourceFileInfos;
}

export const repoService = {
  getProject: async (urlString: string) => {
    const url = new URL(urlString);
    const files = await getRepositoryFiles(url, ['.ts', '.tsx']);

    return files
  }
}