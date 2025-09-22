import { CodeBlock } from "../CodeBlock.tsx"
import { TypeComponentProps } from "../../../types/interface.ts"

export const Arguments = ({ data }: TypeComponentProps) => {
  return (
    <span className={data.type}>
      {
        data.children.map((child, index) => {
          return (
            <span key={index}>
              <CodeBlock info={child} />
            </span>
          )
        })
      }
    </span>
  )
}
