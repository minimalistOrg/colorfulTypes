import { TarReader } from '@gera2ld/tarjs';
// import Parser from 'web-tree-sitter';

export type RepoContent = Record<string, string>;

const getFilename = (fileName: string) => {
  const indexOfFirstSlash = fileName.indexOf('/');
  return fileName.slice(indexOfFirstSlash + 1);
}

const getRepositoryFiles = async (
  url: URL,
  extensions: string[],
  callback?: ((source: string) => any) | undefined,
): Promise<RepoContent> => {
  const urlParts = url.pathname.split('/');
  const ref = urlParts[4];

  const archiveLink =
    `https://api.github.com/repos/${urlParts[1]}/${urlParts[2]}/tarball${ref ? `/${ref}` : ''}`
  const response = await fetch(
    archiveLink,
    { redirect: 'follow' },
  );

  const decompressedStream = response.body?.pipeThrough(new DecompressionStream("gzip"));

  const blob = await new Response(decompressedStream).blob()
  const reader = new TarReader();
  const fileInfos = await reader.readFile(blob);

  const sourceFileInfos = fileInfos.filter(fileInfo =>
    extensions.some(extension => fileInfo.name.endsWith(extension))
  )

  // let tree : Parser.Tree | undefined;
  // sourceFileInfos.forEach((fileInfo) =>
  //   tree = callback(reader.getTextFile(fileInfo.name))
  // )

  const sourceFiles: Record<string, string> = {};

  sourceFileInfos.reduce(
    (acc, fileInfo) => {
      acc[getFilename(fileInfo.name)] = reader.getTextFile(fileInfo.name);
      return acc;
    },
    sourceFiles
  );

  return sourceFiles;
};

export const repoService = {
  getRepo: async (
    urlString: string,
    extensions: string[],
    callback?: ((source: string) => any) | undefined,
  ): Promise<RepoContent> => {
    const url = new URL(urlString);
    const files = await getRepositoryFiles(url, extensions, callback);

    return files;
  }
};
