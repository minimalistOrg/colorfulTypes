import { nameToColor } from "../utils/nameToColor";
import styles from "./UiType.module.css";

export const UiType = ({
  name,
}: {
  name: string,
}) => {
  const color = nameToColor(name);

  return (
    <div
      className={styles.uiType}
      style={{ backgroundColor: `oklch(${color.l}% 0.2 ${color.hue})` }}
    />
  )
};
