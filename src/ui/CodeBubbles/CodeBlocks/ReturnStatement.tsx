import {TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function ReturnStatement(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);
  return (
    <>
      <span className="ReturnStatement__text">return </span>
      <span>
        <CodeBlock code={data.children[1]} />
      </span>
    </>
  );
}
export default ReturnStatement;
