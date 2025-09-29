// import { ChooseType } from "../ChooseType";

import {TypeComponentProps} from "../../../types/interface.ts";

function JsxText(props: TypeComponentProps) {
  const data = props.data;

  return <span className="JsxText">{data.text}</span>;
}

export default JsxText;
