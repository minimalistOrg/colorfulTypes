import { nameToColor } from "../utils/nameToColor";
import { MyInterface } from "../utils/parser";
import { Tooltip } from "./Tooltip";

import styles from "./UiType.module.css";

export const UiType = ({
  name,
}: {
  name: string,
}) => {
  const color = nameToColor(name);

  return (
    <Tooltip text={name}>
      <div
        className={styles.uiType}
        style={{ backgroundColor: `oklch(${color.l}% 0.2 ${color.hue})` }}
      />
    </Tooltip>
  );
};

export const UiTypeGrid = (
  { myInterfaces } : { myInterfaces: MyInterface[] }
) => {
  return (
    <div className={styles.uiTypeGrid}>
      {myInterfaces.map(myInterface => (
        <UiType name={myInterface.name} key={myInterface.name} />
      ))}
    </div>
  )
}
