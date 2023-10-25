import { expect, test, describe, it } from 'vitest'
import { buildFunction, buildInterface } from '../parser'
import { emptySyntaxNode, mockQueryCapture, mockSyntaxNode } from './mocks'

test('build interface', () => {
  const interfaceCapture = mockQueryCapture({
    name: 'definition.interface',
    children: [
      emptySyntaxNode(),
      mockSyntaxNode({
        text: 'MyInterface',
        children: [],
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

describe('build function', () => {
  it('builds an arrow function with no params', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.function',
      children: [
        mockSyntaxNode({ text: 'const' }),
        mockSyntaxNode({
          text: 'arrowFunctionName = (): void => {}',
          children: [
            mockSyntaxNode({ text: 'arrowFunctionName'}),
            mockSyntaxNode({ text: '='}),
            mockSyntaxNode({
              text: '(): void => {}',
              children: [
                mockSyntaxNode({
                  text: '()',
                  children: [
                    mockSyntaxNode({ text: '(' }),
                    mockSyntaxNode({ text: ')' }),
                  ],
                }),
                mockSyntaxNode({ text: ': void' }),
                mockSyntaxNode({ text: '=>' }),
                mockSyntaxNode({ text: '{}' }),
              ]
            }),
          ],
        })
      ]
    });

    expect(buildFunction(functionCapture)).toStrictEqual({
      name: 'arrowFunctionName',
      parameters: [],
      returnType: {
        type: 'void',
        predefinedType: true,
      },
      codebasePosition: {
        start: { row: 0, column: 0 },
        end: { row: 0, column: 0 }
      }
    });
  });
});
