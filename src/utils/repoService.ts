import { ITarFileInfo, TarReader } from '@gera2ld/tarjs';

export interface FileInfo extends ITarFileInfo {
  content: string | undefined;
}

export interface GithubRepo {
  org: string;
  repo: string;
}

export interface RepositoryFile {
  kind: 'file';
  name: string;
  extension: string | undefined;
  size: number;
  content: string | undefined;
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

const getRepositoryFiles = async (githubRepo: GithubRepo): Promise<FileInfo[]> => {
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
  const tarFileInfos = await reader.readFile(blob);

  const fileInfos = tarFileInfos.map(fileInfo => {
    if (fileInfo.size < 1_000_000) {
      return {
        ...fileInfo,
        name: getFilename(fileInfo.name),
        content: reader.getTextFile(fileInfo.name),
      }
    } else {
      return {
        ...fileInfo,
        name: getFilename(fileInfo.name),
        content: undefined,
      }
    }
  });

  return fileInfos;
};

export const repoService = {
  getRepo: getRepositoryFiles,
  getTree: async (githubRepo: GithubRepo): Promise<RepositoryFolder> => {
    const repositoryFiles = await getRepositoryFiles(githubRepo);
    const repository: RepositoryFolder = {
      kind: 'folder' as const,
      name: `${githubRepo.org}/${githubRepo.repo}`,
      files: [],
      folders: [],
    };
    let current: RepositoryItem;

    for (const fileInfo of repositoryFiles) {
      // ignore pax_global_header file that contains info about the gzip
      const fileName = fileInfo.name;
      if (fileName === 'pax_global_header') {
        continue;
      }

      current = repository;

      for (const segment of fileName.split('/')) {
        if (segment !== '') {
          if (current && current.kind === 'folder') {
            let childItem: RepositoryItem | undefined = current.folders.find(i => i.name === segment);

            if (!childItem) {
              if (fileName.endsWith(segment) && !fileName.endsWith('/')) {
                childItem = {
                  kind: 'file',
                  name: segment,
                  content: fileInfo.content,
                  size: fileInfo.size,
                  extension: segment.split('.').at(-1)
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
