import {TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function IfStatement(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);
  //
  function checkelse() {
    if (data.children.length > 3) {
      return (
        <span>
          {" "}
          <CodeBlock code={data.children[3]} />{" "}
        </span>
      );
    }
  }

  return (
    <span className="IfStatement">
      <span>
        <CodeBlock code={data.children[0]} />
      </span>
      <span>
        {" "}
        <CodeBlock code={data.children[1]} />{" "}
      </span>
      <span>{"{"}</span>
      <CodeBlock code={data.children[2]} />
      <span>{"}"}</span>
      {checkelse()}
    </span>
  );
}

export default IfStatement;
