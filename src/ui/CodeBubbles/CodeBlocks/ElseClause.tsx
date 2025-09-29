import {TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function ElseClause(props: TypeComponentProps) {
  const data = props.data;

  return (
    <span className="ElseClause">
      <span>
        <CodeBlock code={data.children[0]} />
      </span>
      <span>{" {"}</span>

      <CodeBlock code={data.children[1]} />
        <span>{"}"}</span>
    </span>
  );
}

export default ElseClause;
