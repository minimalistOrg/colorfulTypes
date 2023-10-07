import classNames from "classnames";

import { MyFunction } from "../utils/parser";
import { nameToColor } from "../utils/nameToColor";
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
        <UiType color={nameToColor(myArgument.type)} key={myArgument.name} />
      ))}
      <p>)</p>
    </div>
  )
};
