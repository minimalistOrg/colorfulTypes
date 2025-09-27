import { Arguments } from "./CodeBlocks/Arguments"
import { CallExpression } from "./CodeBlocks/CallExpression"
import ExpressionStatement from "./CodeBlocks/ExpressionStatement"
import { MemberExpression } from "./CodeBlocks/MemberExpression"
import { StatementBlock } from "./CodeBlocks/StatementBlock"
import { StringType } from "./CodeBlocks/String"
import LexicalDeclaration from "./CodeBlocks/LexicalDeclaration"
import VariableDeclarator from "./CodeBlocks/VariableDeclarator"
import NumberType from "./CodeBlocks/NumberType"
import { Identifier } from "./CodeBlocks/Identifier"
import BinaryExpression from "./CodeBlocks/BinaryExpression"
import ReturnStatement from "./CodeBlocks/ReturnStatement"
import IfStatement from "./CodeBlocks/IfStatement"
import ElseClause from "./CodeBlocks/ElseClause"
import ParenthesizedExpression from "./CodeBlocks/ParenthesizedExpression"
import ArrowFunction from "./CodeBlocks/ArrowFunction"
import FormalParameters from "./CodeBlocks/FormalParameters"
import TemplateString from "./CodeBlocks/TemplateString"
import TemplateSubstitution from "./CodeBlocks/TemplateSubstitution"
import UnaryExpression from "./CodeBlocks/UnaryExpression"
import Comment from "./CodeBlocks/Comment"
import ObjectPattern from "./CodeBlocks/ObjectPattern"
import ShorthandPropertyIdentifierPattern from "./CodeBlocks/ShorthandPropertyIdentifierPattern"
import SubscriptExpression from "./CodeBlocks/SubscriptExpression"
import AssigmentExpression from "./CodeBlocks/AssigmentExpression"
import VariableDeclaration from "./CodeBlocks/VariableDeclaration"
import ForStatement from "./CodeBlocks/ForStatement"
import Array from "./CodeBlocks/Array"
import ContinueStatement from "./CodeBlocks/ContinueStatement"
import UpdateExpression from "./CodeBlocks/UpdateExpression"
import { PropertyIdentifier } from "./CodeBlocks/PropertyIdentifier"
import JsxElement from "./CodeBlocks/JsxElement"
import JsxOpeningElement from "./CodeBlocks/JsxOpeningElement"
import JsxClosingElement from "./CodeBlocks/JsxClosingElement"
import JsxAttributeElement from "./CodeBlocks/JsxAttribute"
import JsxSelfClosingElement from "./CodeBlocks/JsxSelfClosingElement"
import JsxExpression from "./CodeBlocks/JsxExpression"
import JsxText from "./CodeBlocks/JsxText"
import ArrayPattern from "./CodeBlocks/ArrayPattern"
import JsxFragment from "./CodeBlocks/JsxFragment"
import TernaryExpression from "./CodeBlocks/TernaryExpression"
import Object from "./CodeBlocks/Object"
import Pair from "./CodeBlocks/Pair"
import AugmentedAssignmentExpression from "./CodeBlocks/AugmentedAssignmentExpression"
import PairPattern from "./CodeBlocks/PairPattern"
import WhileStatement from "./CodeBlocks/WhileStatement"
import DoStatement from "./CodeBlocks/DoStatement"
import SwitchStatement from "./CodeBlocks/SwitchStatement"
import SwitchBody from "./CodeBlocks/SwitchBody"
import SwitchCase from "./CodeBlocks/SwitchCase"
import BreakStatementcase from "./CodeBlocks/BreakStatementcase"
import SwitchDefault from "./CodeBlocks/SwitchDefault"
import ForInStatement from "./CodeBlocks/ForInStatement"
import TryStatement from "./CodeBlocks/TryStatement"
import CatchClause from "./CodeBlocks/CatchClause"
import NestedIdentifier from "./CodeBlocks/NestedIdentifier"
import TypeAnnotation from "./CodeBlocks/TypeAnnotation"

const UniversalType = (props: any) => {
  const data = props.data

  if (data.children.length > 1) {
    return (
      <span className={props.type}>
        {data.children.map((e: any, index: number) => {
          return (
            <span key={index}>
              <CodeBlock code={e} />
            </span>
          )
        })}
      </span>
    )
  } else {
   return <span className={props.type}> {data.text} </span>
  }
}

export const CodeBlock = (props: {
  code: any
}) => {
  const { code: info } = props

  switch (info.type) {
    // Types
    case "type_annotation":
      return <TypeAnnotation data={info} />

    // Keywords
    case "catch_clause":
      return <CatchClause data={info} />
    case "nested_identifier":
      return <NestedIdentifier data={info} />
    case "try_statement":
      return <TryStatement data={info} />
    case "for_in_statement":
      return <ForInStatement data={info} />
    case "switch_default":
      return <SwitchDefault data={info} />
    case "break_statement":
      return <BreakStatementcase data={info} />
    case "switch_case":
      return <SwitchCase data={info} />
    case "switch_body":
      return <SwitchBody data={info} />
    case "switch_statement":
      return <SwitchStatement data={info} />
    case "do_statement":
      return <DoStatement data={info} />
    case "while_statement":
      return <WhileStatement data={info} />
    case "augmented_assignment_expression":
      return <AugmentedAssignmentExpression data={info} />
    case "pair":
      return <Pair data={info} />
    case "pair_pattern":
      return <PairPattern data={info} />
    case "object":
      return <Object data={info} />
    case "ternary_expression":
      return <TernaryExpression data={info} />
    case "array_pattern":
      return <ArrayPattern data={info} />
    case "jsx_fragment":
      return <JsxFragment data={info} />
    case "jsx_text":
      return <JsxText data={info} />
    case "jsx_expression":
      return <JsxExpression data={info} />
    case "jsx_self_closing_element":
      return <JsxSelfClosingElement data={info} />
    case "jsx_attribute":
      return <JsxAttributeElement data={info} />
    case "jsx_closing_element":
      return <JsxClosingElement data={info} />
    case "jsx_opening_element":
      return <JsxOpeningElement data={info} />
    case "jsx_element":
      return <JsxElement data={info} />
    case "property_identifier":
      return <PropertyIdentifier data={info} />
    case "update_expression":
      return <UpdateExpression data={info} />
    case "continue_statement":
      return <ContinueStatement data={info} />
    case "array":
      return <Array data={info} />
    case "for_statement":
      return <ForStatement data={info} />
    case "variable_declaration":
      return <VariableDeclaration data={info} />
    case "assignment_expression":
      return <AssigmentExpression data={info} />
    case "subscript_expression":
      return <SubscriptExpression data={info} />
    case "shorthand_property_identifier_pattern":
      return <ShorthandPropertyIdentifierPattern data={info} />
    case "object_pattern":
      return <ObjectPattern data={info} />
    case "comment":
      return <Comment data={info} />
    case "unary_expression":
      return <UnaryExpression data={info} />
    case "template_substitution":
      return <TemplateSubstitution data={info} />
    case "template_string":
      return <TemplateString data={info} />
    case "formal_parameters":
    case "required_parameter":
      return <FormalParameters type={info.type} data={info} />
    case "arrow_function":
      return <ArrowFunction data={info} />
    case "parenthesized_expression":
      return <ParenthesizedExpression data={info} />
    case "else_clause":
      return <ElseClause data={info} />
    case "if_statement":
      return <IfStatement data={info} />
    case "return_statement":
      return <ReturnStatement data={info} />
    case "binary_expression":
      return <BinaryExpression data={info} />
    case "identifier":
    case "type_identifier":
      return <Identifier type={info.type} data={info} />
    case "number":
      return <NumberType data={info} />
    case "variable_declarator":
      return <VariableDeclarator data={info} />
    case "lexical_declaration":
      return <LexicalDeclaration data={info} />
    case "string":
      return <StringType data={info} />
    case "arguments":
      return <Arguments data={info} />
    case "member_expression":
      return <MemberExpression data={info} />
    case "call_expression":
      return <CallExpression data={info} />
    case "expression_statement":
      return <ExpressionStatement data={info} />
    case "statement_block":
      return <StatementBlock data={info} />

    case "while":
      return <span className="ReservedWords">while</span>
    case "do":
      return <span className="ReservedWords">do</span>
    case "if":
      return <span className="ReservedWords">if</span>
    case "else":
      return <span className="ReservedWords">else</span>
    case "continue":
      return <span className="ReservedWords">continue</span>
    case "switch":
      return <span className="ReservedWords">switch</span>
    case "case":
      return <span className="ReservedWords">case</span>
    case "break":
      return <div className="ReservedWords">break</div>
    case "default":
      return <span className="ReservedWords">default</span>
    case "in":
      return <span className="ReservedWords">in</span>
    case "try":
      return <span className="ReservedWords">try</span>
    case "catch":
      return <span className="ReservedWords">catch</span>

    // Symbols
    case ",":
      return <span>, </span>
    case "(":
      return <>(</>
    case ")":
      return <>)</>
    case "{":
      return <>{"{"}</>
    case "}":
      return <>{"}"}</>
    case "+":
      return <>+</>
    case "++":
      return <>++</>
    case "/":
      return <>/</>
    case "*":
      return <>*</>
    case "-":
      return <>-</>
    case "--":
      return <>--</>
    case ">":
      return <> {">"} </>
    case "<":
      return <> {"<"} </>
    case "===":
      return <> === </>
    case "=":
      return <> = </>
    case "==":
      return <> == </>
    case "+=":
      return <> += </>
    case "!==":
      return <>!== </>
    case "!":
      return <>!</>
    case "||":
      return <>||</>
    case "=>":
      return <> {"=>"} </>
    case "<=":
      return <> {"<="} </>
    case ">=":
      return <> {">="} </>
    case "&&":
      return <> {"&&"} </>
    case "${":
      return <>{"${"}</>
    case "[":
      return <>[</>
    case "]":
      return <>]</>
    case "":
      return <></>
    case ":":
      return <>:</>
    case "?":
      return <>?</>
    case ".":
      return <>.</>

    // Keywords
    case "var":
      return <span className="LexicalDeclaration__variableType">var</span>
    case "const":
      return <span className="LexicalDeclaration__variableType">const</span>
    case "for":
      return <span className="ReservedWords">for</span>
    case "false":
      return <span className="TypeBoolean">false</span>
    case "null":
      return <span className="TypeBoolean">null</span>
    case "true":
      return <span className="TypeBoolean">true</span>
    case "`":
      return <>{"`"}</>
    case "loading":
      return <p>Loading...</p>
    default:
      return <UniversalType data={info} type={info.type} />
  }
}
