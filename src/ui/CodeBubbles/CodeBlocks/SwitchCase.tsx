import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function SwitchCase(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);

  return (
    <div className="SwitchCase">
      {data.children.map((e: TreesitterData, index: number) => {
        return (
          <span key={index}>
            <CodeBlock code={e} />
          </span>
        );
      })}
    </div>
  );
}

export default SwitchCase;
