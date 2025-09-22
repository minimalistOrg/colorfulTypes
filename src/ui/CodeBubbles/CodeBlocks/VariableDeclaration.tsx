import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function VariableDeclaration(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);

  return (
    <span className="VariableDeclaration">
      {data.children.map((e: TreesitterData, index: number) => {
        return (
          <span key={index}>
            <CodeBlock info={e} />
          </span>
        );
      })}
    </span>
  );
}

export default VariableDeclaration;
