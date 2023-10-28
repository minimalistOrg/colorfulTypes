import { QueryCapture, SyntaxNode } from "web-tree-sitter";

export const mockSyntaxNode = ({
  children = [],
  text = '',
  type = '',
}: {
  children?: SyntaxNode[];
  text?: string;
  type?: string;
}): SyntaxNode => {
  return {
    startPosition: { row: 0, column: 0 },
    endPosition: { row: 0, column: 0 },
    children,
    type,
    text,
  } as unknown as SyntaxNode;
};

export const emptySyntaxNode = () => {
  return mockSyntaxNode({});
};

export const mockQueryCapture = ({
  name,
  children,
}: {
  name: string;
  children: SyntaxNode[]
}): QueryCapture => {
  return {
    name,
    node: mockSyntaxNode({ children }),
  };
};