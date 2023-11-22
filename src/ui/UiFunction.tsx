import { CSSProperties } from "react";
import classnames from "classnames";

import { MyFunction } from "../utils/parser";
import { UiType } from "./UiType";

import styles from './UiFunction.module.css';
import { ZoomLevel } from "../types";

export const UiFunction = ({
  myFunction,
  zoomLevel = 1,
}: {
  myFunction: MyFunction;
  zoomLevel?: ZoomLevel
}) => {
  const columns = zoomLevel === 1 ? Math.ceil(Math.sqrt(myFunction.parameters.length)) : 1;

  return (
    <div
      className={classnames(
        styles.uiFunction,
        styles[`uiFunctionLevel${zoomLevel}`],
        { [styles['uiFunctionSameLineLevel2']]: myFunction.parameters.length === 0 }
      )}
    >
      <div
        className={classnames(styles.uiParameterGroup, styles[`uiParameterGroupLevel${zoomLevel}`])}
      >
        <p className={styles.uiSymbol}>(</p>

        <div
          className={styles.uiParameters}
          style={ { '--columns': columns } as CSSProperties}
        >
          {myFunction.parameters.map(myParameter => (
            <UiType
              name={myParameter.type}
              predefinedType={myParameter.predefinedType}
              key={myParameter.name}
              zoomLevel={zoomLevel}
            />
          ))}
        </div>

        <p className={styles.uiSymbol}>)</p>
      </div>

      <div className="flex flex-vcenter flex-gap1">
        <p className={styles.uiSymbol}>{'=>'}</p>

        <div className={styles.uiReturnType}>
          <UiType
            name={myFunction.returnType.type}
            predefinedType={myFunction.returnType.predefinedType}
            zoomLevel={zoomLevel}
          />
        </div>
      </div>
    </div>
  )
};

export const UiFunctionList = ({
  myFunctions,
}: {
  myFunctions: MyFunction[];
}) => {
  return (
    <div className={styles.uiFunctionList}>
      {myFunctions.map(myFunction => (
        <UiFunction myFunction={myFunction} key={myFunction.name} />
      ))}
    </div>
  )
};
