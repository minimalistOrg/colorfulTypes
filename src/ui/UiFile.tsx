import { MyFile } from "../utils/parser";
import { UiFunctionList } from "./UiFunction";
import { UiTypeGrid } from "./UiType";

export const UiFile = ({
  myFile,
}: {
  myFile: MyFile;
}) => {
  return (
    <div>
      <UiTypeGrid myInterfaces={myFile.myInterfaces} />
      <UiFunctionList myFunctions={myFile.myFunctions} />
    </div>
  )
};
