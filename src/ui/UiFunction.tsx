import { CSSProperties, ReactNode } from "react";
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
}): ReactNode => {
  const columns = zoomLevel === 1 ? Math.ceil(Math.sqrt(myFunction.parameters.length)) : 1;
  const zeroParameters = myFunction.parameters.length === 0;

  return (
    <div
      className={classnames(
        styles.uiFunction,
        styles[`uiFunctionLevel${zoomLevel}`],
        { [styles['uiFunctionSameLineLevel2']]: zeroParameters }
      )}
    >
      {
        zoomLevel === 2 && (
          <p
            className={
              classnames(
                styles.uiFunctionName,
                { [styles.uiFunctionNameMargin]: !zeroParameters }
              )
            }
          >
            {myFunction.name}
          </p>
        )
      }

      <div
        className={
          classnames(
            styles.uiParameterGroup,
            { [styles[`uiParameterGroupLevel${zoomLevel}`]]: !zeroParameters }
          )
        }
      >
        <p className={styles.uiSymbol}>(</p>

        <div
          className={styles.uiParameters}
          style={ { '--columns': columns } as CSSProperties}
        >
          {myFunction.parameters.map(myParameter => (
            <div className="flex flex-vcenter" key={myParameter.name}>
              {
                zoomLevel === 2 && (
                  <p className={styles.uiParameterLevel2}>{`${myParameter.name}:`}</p>
                )
              }

              <UiType
                name={myParameter.type}
                predefinedType={myParameter.predefinedType}
                zoomLevel={zoomLevel}
              />
            </div>
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
}): ReactNode => {
  return (
    <div className={styles.uiFunctionList}>
      {myFunctions.map(myFunction => (
        <UiFunction myFunction={myFunction} key={myFunction.name} />
      ))}
    </div>
  )
};
