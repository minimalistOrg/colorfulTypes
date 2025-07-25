import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { repoService, RepositoryFolder } from "../utils/repoService";
import { UiFolder } from "./UiFolder";
import { UiFile } from "./UiFile";

export const CodeMap = () => {
  const { org, repo } = useParams();

  if (!org || !repo) {
    throw new Error("Org and repo required");
  }

  const [repoFolder, setRepoFolder] = useState<RepositoryFolder>({
    kind: 'folder',
    name: `${org}/${repo}`,
    files: [],
    folders: [],
  });

  useEffect(() => {
    const getRepoTree = async (): Promise<void> => {
      const tree = await repoService.getTree({ org, repo });

      // const codebase = await parse(
      //   repoContent,
      //   ['.tsx', '.ts'],
      // );

      setRepoFolder(tree);
    };

    getRepoTree();
  }, [])

  return (
    <>
      <h1>Code map</h1>

      {repoFolder.folders.map(folder =>
        <UiFolder folder={folder} key={folder.name} />
      )}

      {repoFolder.files.map(file =>
        <UiFile file={file} key={file.name} />
      )}
    </>
  )
}
