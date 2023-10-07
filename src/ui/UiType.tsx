import { Color } from "../types";
import styles from "./UiType.module.css";

export const UiType = ({
  color,
}: {
  color: Color,
}) => {
  return (
    <div
      className={styles.uiType}
      style={{ backgroundColor: `oklch(${color.l} 0.3 ${color.hue})` }}
    />
  )
};
