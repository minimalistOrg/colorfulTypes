import { TarReader } from '@gera2ld/tarjs';

export type RepoContent = Record<string, string>;

export interface GithubRepo {
  org: string;
  repo: string;
}

const getFilename = (fileName: string): string => {
  const indexOfFirstSlash = fileName.indexOf('/');
  return fileName.slice(indexOfFirstSlash + 1);
}

const getRepositoryFiles = async (
  githubRepo: GithubRepo,
  extensions: string[],
): Promise<RepoContent> => {
  const archiveLink = `https://minimalist-api.vercel.app/${githubRepo.org}/${githubRepo.repo}`;
  const response = await fetch(
    archiveLink,
    {
      headers: {
        'Origin': "https://colorful-types.netlify.app",
      },
      redirect: 'follow'
    },
  );

  const decompressedStream = response.body?.pipeThrough(new DecompressionStream("gzip"));

  const blob = await new Response(decompressedStream).blob()
  const reader = new TarReader();
  const fileInfos = await reader.readFile(blob);

  const sourceFileInfos = fileInfos.filter(fileInfo =>
    extensions.some(extension => fileInfo.name.endsWith(extension))
  )

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
    githubRepo: GithubRepo,
    extensions: string[],
  ): Promise<RepoContent> => {
    return getRepositoryFiles(githubRepo, extensions);
  }
};
