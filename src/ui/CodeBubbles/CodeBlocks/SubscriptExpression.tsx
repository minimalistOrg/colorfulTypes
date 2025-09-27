import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function SubscriptExpression(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);

  return (
    <span>
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

export default SubscriptExpression;
