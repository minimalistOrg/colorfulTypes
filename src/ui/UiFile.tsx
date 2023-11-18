import { MyFile } from "../utils/parser";
import { UiFunctionList } from "./UiFunction";
import { UiTypeGrid } from "./UiType";
import { Tooltip } from "./Tooltip";

import styles from "./UiFile.module.css";

export const UiFile = ({
  myFile,
}: {
  myFile: MyFile;
}) => {
  return (
    <Tooltip text={myFile.filename} placement="top">
      <div className={styles.uiFile}>
        { myFile.myTypes.length > 0 && (
          <UiTypeGrid myTypes={myFile.myTypes} />
        )}

        { myFile.myFunctions.length > 0 && (
          <UiFunctionList myFunctions={myFile.myFunctions} />
        )}
      </div>
    </Tooltip>
  )
};
