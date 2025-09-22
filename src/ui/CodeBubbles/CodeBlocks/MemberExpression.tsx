import { TypeComponentProps } from "../../../types/interface.ts"
import { CodeBlock } from "../CodeBlock.tsx"

export const MemberExpression = ({ data }: TypeComponentProps) => {
  return (
    <span className={data.type}>
      {
        data.children.map((child, index) => {
          return (
            <CodeBlock info={child} key={index} />
          )
        })
      }
    </span>
  )
}
