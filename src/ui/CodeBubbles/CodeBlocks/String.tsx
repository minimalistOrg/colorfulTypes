import { TypeComponentProps } from "../../../types/interface.ts";

export const StringType = ({ data }: TypeComponentProps) => {
  return (
    <span className={data.type}>{data.text}</span>
  )
}
