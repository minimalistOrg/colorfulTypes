
import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function BreakStatementcase(props: TypeComponentProps) {
  const data = props.data;

  return (
    <span className="BreakStatementcase">
      {data.children.map((e: TreesitterData, index: number) => {
        return (
          <span key={index}>
            <CodeBlock code={e} />
          </span>
        );
      })}
    </span>
  );
}

export default BreakStatementcase;
