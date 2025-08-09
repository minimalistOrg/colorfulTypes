import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { repoService, RepositoryRoot } from "../utils/repoService";
import { UiFolder } from "./UiFolder";
import { UiFile } from "./UiFile";

export const CodeMap = () => {
  const { org, repo } = useParams();

  if (!org || !repo) {
    throw new Error("Org and repo required");
  }

  const [repoRoot, setRepoRoot] = useState<RepositoryRoot | undefined>();

  useEffect(() => {
    const getRepoTree = async (): Promise<void> => {
      const tree = await repoService.getTree({ org, repo });

      // const codebase = await parse(
      //   repoContent,
      //   ['.tsx', '.ts'],
      // );

      setRepoRoot(tree);
    };

    getRepoTree();
  }, [])

  return (
    <>
      <h2>Code map</h2>

      <h1>{org}/{repo}</h1>

      {repoRoot && (
        <>
          {repoRoot.folders.map(folder =>
            <UiFolder folder={folder} key={folder.name} />
          )}

          {repoRoot.files.map(file =>
            <UiFile file={file} key={file.name} />
          )}
        </>
      )}
    </>
  )
}
