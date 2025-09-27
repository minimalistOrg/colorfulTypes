import {TreesitterData, TypeComponentProps} from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx";

function FormalParameters(props: TypeComponentProps & {type:string}) {
  const data = props.data;
  // console.log(data);

  return (
    <span className={props.type} >
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

export default FormalParameters;
