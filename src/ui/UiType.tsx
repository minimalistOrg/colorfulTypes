import { Color } from "../types";
import styles from "./UiFunction.module.css";

export const UiFunction = ({
  color,
}: {
  color: Color,
}) => {
  return (
    <div
      className={styles.uiFunction}
      style={{ backgroundColor: `oklch(${color.l} 0.3 ${color.hue})` }}
    />
  )
};
