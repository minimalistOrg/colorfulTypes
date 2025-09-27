

import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function DoStatement(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);

  return (
    <span className="DoStatement">
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

export default DoStatement;
