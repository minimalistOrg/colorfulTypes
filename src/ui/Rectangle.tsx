import { Position } from "../types";

export const Rectangle = ({ position }: { position: Position}) => {
  return (
    <rect x={position.x} y={position.y} width="30" height="30" style={{ fill: 'rgb(0, 0, 255)' }} rx="5" />
  );
};
