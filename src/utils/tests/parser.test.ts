import { expect, test } from 'vitest'
import { buildInterface } from '../parser'
import { emptySyntaxNode, mockQueryCapture, mockSyntaxNode } from './mocks'

test('build interface', () => {
  const interfaceCapture = mockQueryCapture({
    name: 'definition.interface',
    children: [
      emptySyntaxNode(),
      mockSyntaxNode({
        children: [mockSyntaxNode({ children: []})],
        text: 'MyInterface'
      })
    ]
  });

  expect(buildInterface(interfaceCapture)).toStrictEqual({
    name: 'MyInterface',
    codebasePosition: {
      start: { row: 0, column: 0 },
      end: { row: 0, column: 0 }
    }
  });
});
