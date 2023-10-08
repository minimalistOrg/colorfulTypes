import styles from "./UiFile.module.css";

import { MyFile } from "../utils/parser";
import { UiFunctionList } from "./UiFunction";
import { UiTypeGrid } from "./UiType";

export const UiFile = ({
  myFile,
}: {
  myFile: MyFile;
}) => {
  return (
    <div className={styles.uiFile}>
      <UiTypeGrid myInterfaces={myFile.myInterfaces} />
      <UiFunctionList myFunctions={myFile.myFunctions} />
    </div>
  )
};
