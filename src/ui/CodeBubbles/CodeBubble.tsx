import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Codebase, parse } from "../../utils/parser";
import { repoService } from "../../utils/repoService";
import { CodeBlock } from "./CodeBlock";
import { CollapseIcon } from "../Icons/CollapseIcon";
import { CloseIcon } from "../Icons/CloseIcon";

export const CodeBubble = () => {
  const { org, repo } = useParams();
  const [codebase, setCodebase] = useState<Codebase>({ myFiles: {} });

  useEffect(() => {
    const getCodebase = async (org: string, repo: string): Promise<void> => {
      const repoContent = await repoService.getRepo({
        org, repo
      });

      const codebase = await parse(
        repoContent,
        ['.tsx', '.ts'],
      );
      setCodebase(codebase);
    };

    if (org && repo) {
      getCodebase(org, repo);
    }
  }, [])

  return (
    <>
      <h2>Code Bubbles</h2>
      <h1>{org}/{repo}</h1>

      { org && repo && (
        <div>
          {
            Object.entries(codebase.myFiles).map(([filename, myFile]) => {
              if (myFile.myTypes.length > 0 || myFile.myFunctions.length > 0) {
                return (
                  <div key={myFile.filename}>
                    <h3>{filename}</h3>

                    { myFile.myFunctions.map(myFunction =>
                      <div key={myFunction.name}>
                        <div className="CodeBlock__header">
                          <div className="CodeBlock__title">
                            <div onClick={() => {}} className="CodeBlock__collapse">
                              <CollapseIcon />
                            </div>
                            <h4>{myFunction.name}</h4>

                            <span className="CodeBlock__arguments">
                              {
                                myFunction.parameters.map((param, index) => {
                                  return (
                                    <span key={index}>
                                      {param.name}: {param.type}, 
                                    </span>
                                  )
                                })
                              }
                            </span>
                          </div>

                          {/* <button
                            className="CodeBlock__menu"
                            title={`Close ${myFunction.name}`}
                          >
                            <CloseIcon size={20} />
                          </button> */}
                        </div>

                        <CodeBlock code={myFunction.body} />
                      </div>
                    )}
                  </div>
                )
              }
            })
          }
        </div>
      )}
    </>
  );
};
