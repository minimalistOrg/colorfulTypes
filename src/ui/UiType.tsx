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
}: {
  name: string;
  predefinedType?: boolean;
}) => {
  if (predefinedType) {
    return (
      <Tooltip text={name}>
        <p className={styles.uiPredefinedType}>
          {emojis[name]}
        </p>
      </Tooltip>
    );
  }

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
