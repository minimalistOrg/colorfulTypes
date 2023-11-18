import { CSSProperties } from "react";

import { MyFunction } from "../utils/parser";
import { UiType } from "./UiType";

import styles from './UiFunction.module.css';

export const UiFunction = ({
  myFunction,
}: {
  myFunction: MyFunction;
}) => {
  const columns = Math.ceil(Math.sqrt(myFunction.parameters.length))

  return (
    <div className={styles.uiFunction}>
      <div className={styles.uiParameterGroup}>
        <p className={styles.uiSymbol}>(</p>

        <div className={styles.uiParameters} style={ { '--columns': columns } as CSSProperties}>
          {myFunction.parameters.map(myParameter => (
            <UiType
              name={myParameter.type}
              predefinedType={myParameter.predefinedType}
              key={myParameter.name}
            />
          ))}
        </div>

        <p className={styles.uiSymbol}>)</p>
      </div>

      <p className={styles.uiSymbol}>{'=>'}</p>

      <div className={styles.uiReturnType}>
        <UiType name={myFunction.returnType.type} predefinedType={myFunction.returnType.predefinedType} />
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
