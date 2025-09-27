import { TypeComponentProps } from "../../../types/interface.ts"
import { CodeBlock } from "../CodeBlock.tsx"

export const StatementBlock = ({ data }: TypeComponentProps) => {
  // Remove first and last children that are '{' & '}'
  const statementBlockChildren = data.children.slice(1, -1)

  return (
    <div className="StatementBlock">
      {
        statementBlockChildren.map((child, index) => {
          return (
            <CodeBlock code={child} key={index} />
          )
        })
      }
    </div>
  )
}
