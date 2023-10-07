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
      <div className={styles.uiArguments}>
        <p>(</p>
        {myFunction.arguments.map(myArgument => (
          <UiType name={myArgument.type} key={myArgument.name} />
        ))}
        <p>)</p>
      </div>

      <p>{'=>'}</p>

      <div className={styles.uiReturnType}>
        <UiType name={myFunction.returnType.type} />
      </div>
    </div>
  )
};
