import { CodeBlock } from "../CodeBlock.tsx"
import { TypeComponentProps } from "../../../types/interface.ts"

import ResponsiveStyles from './ResponsiveStyles.module.css'

export const CallExpression = ({ data }: TypeComponentProps) => {
  const [memberExpression, argumentsData] = data.children
  const [openParenthesis, ...functionArguments] = argumentsData.children
  const closeParenthesis = functionArguments.pop()
  // const totalCharacters = numberOfCharacters(data)

  // const validifFnCall = () => {
  //   const expressionType = memberExpression.type

  //   if (expressionType === "identifier") {
  //     setName(memberExpression.text)
  //     setId(uuidv4())
  //     setParams(argumentsData.children as [])

  //     const position = listOfFunctions.find((element) => element.name === memberExpression.text)

  //     if (position) {
  //       setFunctionIndex(position.id)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (ied === "") {
  //     setIed(uuidv4())
  //   }

  //   const getName = functionIndex > -1 ? listOfFunctions[functionIndex].name : ""
  //   const functionData = {
  //     id: id,
  //     ied: expression.current?.id,
  //     params: params,
  //     name: getName,
  //     index: functionIndex,
  //     value: [],
  //     event: functionIndex > -1 ? true : false,
  //     order: fnOrder,
  //     element: () => {
  //       return document.getElementById("id" + ied)
  //     },
  //     Bubble: () => {
  //       let result = document.getElementById("id" + id)
  //       return result
  //     },
  //     visibility: true,
  //   }

  //   validifFnCall()

  //   if (functionIndex > -1) {
  //     Object.defineProperty(
  //       functionData.element(),
  //       "fninfo",
  //       { value: functionData, writable: true }
  //     )
  //   }
  //   //eslint-disable-next-line
  // }, [functionIndex])

  // const handleMouseOver = (data: { currentTarget: (HTMLElement & FnInfoType) | null }) => {
  //   if (data.currentTarget?.fninfo.Bubble() !== undefined) {
  //     data.currentTarget?.fninfo.Bubble()?.classList.add("CodeBlockHover")
  //     data.currentTarget?.fninfo.Bubble()?.children[0].classList.add("CodeBlock__header--hover")
  //   }
  // }

  // const handleMouseLeave = (data: {
  //   currentTarget: (HTMLElement & FnInfoType) | null
  // }) => {
  //   if (data.currentTarget?.fninfo === undefined) {
  //     return
  //   }

  //   if (data.currentTarget?.fninfo.Bubble() !== undefined) {
  //     data.currentTarget?.fninfo.Bubble()?.classList.remove("CodeBlockHover")
  //     data.currentTarget?.fninfo.Bubble()?.children[0].classList.remove("CodeBlock__header--hover")
  //   }
  // }

  // const typeCall = () => {
  //   if (functionIndex > -1) {
  //     return "CallExpression"
  //   } else {
  //     return "CallExpression--member_expression"
  //   }
  // }

  return (
    <div
      className={`CallExpression ${ResponsiveStyles.callExpression}`}
      // onMouseOver={handleMouseOver as () => void}
      // onMouseLeave={handleMouseLeave as () => void}
      data-test-id="fncall"
    >
      <div className={ResponsiveStyles.blockStart}>
        <CodeBlock info={memberExpression} />

        <div>{openParenthesis.text}</div>
      </div>

      <div className={ResponsiveStyles.blockBody}>
        {
          functionArguments.map((functionArgument, index) => {
            return (
              <CodeBlock info={functionArgument} key={index} />
            )
          })
        }
      </div>

      {
        closeParenthesis &&
          <div className={ResponsiveStyles.blockEnd}>
            <div>{closeParenthesis.text}</div>
          </div>
      }
    </div>
  )
}
