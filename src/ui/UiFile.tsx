import { Dispatch, SetStateAction } from "react";
import classnames from "classnames";

import { MyFile } from "../utils/parser";
import { UiFunction, UiFunctionList } from "./UiFunction";
import { UiType, UiTypeGrid } from "./UiType";
import { Tooltip } from "./Tooltip";
import { ZoomLevel } from "../types";

import styles from "./UiFile.module.css";

export const UiFile = ({
  myFile,
  setSelectedFile,
  zoomLevel = 1,
}: {
  myFile: MyFile;
  setSelectedFile?: Dispatch<SetStateAction<MyFile | undefined>>;
  zoomLevel?: ZoomLevel;
}) => {
  if (zoomLevel === 1) {
    return (
      <Tooltip text={myFile.filename} placement="top">
        <div
          className={classnames(styles.uiFile, styles.uiFileLevel1)}
          onClick={() => setSelectedFile && setSelectedFile(myFile)}
        >
          { myFile.myTypes.length > 0 && (
            <UiTypeGrid myTypes={myFile.myTypes} />
          )}

          { myFile.myFunctions.length > 0 && (
            <UiFunctionList myFunctions={myFile.myFunctions} />
          )}
        </div>
      </Tooltip>
    );
  } else if (zoomLevel === 2) {
    return (
      <div className={styles.uiFile}>
        <h3>{myFile.filename}</h3>

        { myFile.myTypes.length > 0 && (
          <>
            <h4>Types</h4>

            <div className={styles.uiFileWrapperLevel2}>
              { myFile.myTypes.map(myType => <UiType name={myType.name} zoomLevel={2} />) }
            </div>
          </>
        )}

        { myFile.myFunctions.length > 0 && (
          <>
            <h4>Functions</h4>

            <div className={styles.uiFileWrapperLevel2}>
              {
                myFile.myFunctions.map(myFunction =>
                  <UiFunction myFunction={myFunction} zoomLevel={2} />
                )
              }
            </div>
          </>
        )}
      </div>
    );
  }
};
