import { MyFunction } from "../utils/parser";
import { UiType } from "./UiType";

import styles from './UiFunction.module.css';

export const UiFunction = ({
  myFunction,
}: {
  myFunction: MyFunction;
}) => {
  return (
    <div className={styles.uiFunction}>
      <div className={styles.uiParameterGroup}>
        <p>(</p>

        <div className={styles.uiParameters}>
          {myFunction.parameters.map(myParameter => (
            <UiType name={myParameter.type} key={myParameter.name} />
          ))}
        </div>

        <p>)</p>
      </div>

      <p>{'=>'}</p>

      <div className={styles.uiReturnType}>
        <UiType name={myFunction.returnType.type} />
      </div>
    </div>
  )
};
