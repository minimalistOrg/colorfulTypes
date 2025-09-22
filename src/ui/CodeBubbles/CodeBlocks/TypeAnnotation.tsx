import { TypeComponentProps, TreesitterData } from "../../../types/interface.ts";
import { CodeBlock } from "../CodeBlock.tsx"

function TypeAnnotation(props: TypeComponentProps) {
  const data = props.data;

  return (
    <span className="TypeAnnotation">
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

export default TypeAnnotation;
