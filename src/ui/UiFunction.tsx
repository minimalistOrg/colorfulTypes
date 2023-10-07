import classNames from "classnames";

import { MyFunction } from "../utils/parser";
import { UiType } from "./UiType";

import styles from './UiFunction.module.css';

export const UiFunction = ({
  myFunction,
}: {
  myFunction: MyFunction;
}) => {
  return (
    <div className={classNames('flex', styles.uiFunction)}>
      <p>(</p>
      {myFunction.arguments.map(myArgument => (
        <UiType name={myArgument.type} key={myArgument.name} />
      ))}
      <p>)</p>
    </div>
  )
};
