
import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function JsxExpression(props: TypeComponentProps) {
  const data = props.data;

  return (
    <span className="JsxExpression">
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

export default JsxExpression;
