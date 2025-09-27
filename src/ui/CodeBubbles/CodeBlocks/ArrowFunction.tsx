import {TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function ArrowFunction(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data);
  function checkBlock() {
    // console.log(data.children[2].type)
    if ("statement_block" === data.children[2].type) {
      return (
        <>
          <span>{"{"}</span>
          <span>
            <CodeBlock code={data.children[2]} />
          </span>
          <span>{"}"}</span>
        </>
      );
    } else {
      return (
        <span>
          <CodeBlock code={data.children[2]} />
        </span>
      );
    }
  }


  return (
    <span className="ArrowFunction">
      <span>
        <CodeBlock code={data.children[0]} />
      </span>
      <span>
        <CodeBlock code={data.children[1]} />
      </span>
      {checkBlock()}
    </span>
  );
}

export default ArrowFunction;
