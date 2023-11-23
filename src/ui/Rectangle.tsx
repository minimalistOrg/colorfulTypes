import { ReactNode } from "react";
import { Color, Position } from "../types";

export const Rectangle = ({
  position,
  color,
}: {
  position: Position,
  color: Color,
}): ReactNode => {
  return (
    <rect
      x={position.x}
      y={position.y}
      width="30"
      height="30"
      style={{ fill: `hsl(${color.hue}, 80%, ${color.l}%)` }}
      rx="5"
    />
  );
};
