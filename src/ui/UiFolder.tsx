import { pluralize } from "../utils/languageUtils";
import { RepositoryFolder } from "../utils/repoService";
import { UiFile } from "./UiFile";

export const UiFolder = ({ folder }: { folder: RepositoryFolder}) => {
  return (
    <details style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.2)'}}>
      <summary>
        <div style={{ display: 'inline-flex' }}>
          <div>
            {folder.name}{' '}
            ({folder.folders.length !== 0 && `${folder.folders.length} ${pluralize(folder.folders.length, 'folder')}, `}
            {folder.files.length !== 0 && `${folder.files.length} ${pluralize(folder.files.length, 'file')}`})
          </div>
        </div>
      </summary>

      <div style={{ padding: '2px' }}>
        {folder.folders.map(folder =>
          <UiFolder folder={folder} key={folder.name} />
        )}

        {folder.files.map(file =>
          <UiFile file={file} key={file.name} />
        )}
      </div>
    </details>
  );
}
