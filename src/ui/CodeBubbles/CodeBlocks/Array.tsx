import { CodeBlock } from "../CodeBlock.tsx";
import { TreesitterData, TypeComponentProps } from "../../../types/interface.ts";

function Array(props: TypeComponentProps): JSX.Element {
  const data: TreesitterData = props.data;

  return (
    <span className="Array">
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

export default Array;
