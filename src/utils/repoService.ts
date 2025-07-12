import { TarReader } from '@gera2ld/tarjs';

export type RepoContent = Record<string, string | null>;

export interface GithubRepo {
  org: string;
  repo: string;
}

interface RepositoryFile {
  kind: 'file';
  name: string;
  extension: string;
  size: number;
  content: string | null;
}

export interface RepositoryFolder {
  kind: 'folder';
  name: string;
  files: RepositoryFile[];
  folders: RepositoryFolder[];
}

type RepositoryItem = RepositoryFile | RepositoryFolder;

const getFilename = (fileName: string): string => {
  const indexOfFirstSlash = fileName.indexOf('/');
  return fileName.slice(indexOfFirstSlash + 1);
}

const getRepositoryFiles = async (githubRepo: GithubRepo): Promise<RepoContent> => {
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

  const files = fileInfos.reduce(
    (acc, fileInfo) => {
      if (fileInfo.size < 1_000_000) {
        acc[getFilename(fileInfo.name)] = reader.getTextFile(fileInfo.name);
      } else {
        acc[getFilename(fileInfo.name)] = null
      }

      return acc;
    },
    {} as RepoContent
  );

  return files;
};

export const repoService = {
  getRepo: async (githubRepo: GithubRepo): Promise<RepoContent> => {
    return getRepositoryFiles(githubRepo);
  },
  getTree: async (githubRepo: GithubRepo): Promise<RepositoryFolder> => {
    const repositoryFiles = await getRepositoryFiles(githubRepo);
    const repository: RepositoryFolder = {
      kind: 'folder' as const,
      name: `${githubRepo.org}/${githubRepo.repo}`,
      files: [],
      folders: [],
    };
    let current: RepositoryItem;

    for (const path in repositoryFiles) {
      // ignore pax_global_header file that contains info about the gzip
      if (path === 'pax_global_header') {
        continue;
      }

      current = repository;

      for (const segment of path.split('/')) {
        if (segment !== '') {
          if (current && current.kind === 'folder') {
            let childItem: RepositoryItem | undefined = current.folders.find(i => i.name === segment);

            if (!childItem) {
              if (path.endsWith(segment) && !path.endsWith('/')) {
                childItem = {
                  kind: 'file',
                  name: segment,
                  content: repositoryFiles[path],
                  size: 0,
                  extension: segment.split('.')[-1]
                }

                current.files.push(childItem);
              } else {
                childItem = {
                  kind: 'folder',
                  name: segment,
                  files: [],
                  folders: [],
                }

                current.folders.push(childItem);
              }
            }

            current = childItem;
          }
        }
      }
    }

    return repository;
  }
};
