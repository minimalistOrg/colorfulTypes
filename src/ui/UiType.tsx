import { ZoomLevel } from "../types";
import { nameToColor } from "../utils/nameToColor";
import { MyType } from "../utils/parser";
import { Tooltip } from "./Tooltip";

import styles from "./UiType.module.css";

const emojis: Record<string, string> = {
  any: '*️⃣',
  void: '🚫',
  null: '⛔',
  undefined: '⛔',
  number: '#️⃣',
  boolean: '🔘',
  string: '📝', // '📖',
  unknown: '🔮', // '🛸' or '👽'
  // exception => 🚩 or 🤬
};

export const UiType = ({
  name,
  predefinedType,
  zoomLevel = 1,
}: {
  name: string;
  predefinedType?: boolean;
  zoomLevel?: ZoomLevel;
}) => {
  if (predefinedType) {
    if (zoomLevel === 1) {
      return (
        <Tooltip text={name}>
          <p className={styles.uiPredefinedType}>
            {emojis[name]}
          </p>
        </Tooltip>
      );
    } else if (zoomLevel === 2) {
      return (
        <div className="flex flex-vcenter">
          <p className={styles.uiPredefinedType}>
            {emojis[name]}
          </p>
          <p>{name}</p>
        </div>
      );
    }
  }

  const color = nameToColor(name);

  if (zoomLevel === 1) {
    return (
      <Tooltip text={name}>
        <div
          className={styles.uiType}
          style={{ backgroundColor: `oklch(${color.l}% 0.2 ${color.hue})` }}
        />
      </Tooltip>
    );
  } else if (zoomLevel === 2) {
    return (
      <div className="flex flex-vcenter">
        <div
          className={styles.uiType}
          style={{ backgroundColor: `oklch(${color.l}% 0.2 ${color.hue})` }}
        />
        <p>{name}</p>
      </div>
    );
  }
};

export const UiTypeGrid = (
  { myTypes } : { myTypes: MyType[] }
) => {
  return (
    <div className={styles.uiTypeGrid}>
      {myTypes.map(myType => (
        <UiType name={myType.name} key={myType.name} />
      ))}
    </div>
  )
}
