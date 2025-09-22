import {TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function ExpressionStatement(props: TypeComponentProps) {
  const data = props.data;
  // console.log(data)

  return <CodeBlock info={data.children[0]} />;
}

export default ExpressionStatement;
