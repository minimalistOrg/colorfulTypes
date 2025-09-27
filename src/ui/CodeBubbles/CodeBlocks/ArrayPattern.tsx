
import {TypeComponentProps,TreesitterData} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function ArrayPattern(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);

  return (
    <span className="UpdateExpression">
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

export default ArrayPattern;
