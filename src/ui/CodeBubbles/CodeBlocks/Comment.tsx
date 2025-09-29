import {TypeComponentProps} from "../../../types/interface.ts";

function Comment(props: TypeComponentProps) {
  const data = props.data;

  return <span className="CommentType">{data.text}</span>;
}

export default Comment;
