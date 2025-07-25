import { RepositoryFile } from "../utils/repoService";

export const UiFile = ({ file }: { file: RepositoryFile }) =>
  <p key={file.name}>{file.name} ({file.size.toLocaleString()})</p>
