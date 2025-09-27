import { TypeComponentProps } from "../../../types/interface.ts"

export const Identifier = ({ data, type }: TypeComponentProps & { type: string }) => {
  const { text } = data;

  return (
    <span className={type}>
      {text}
    </span>
  );
}
