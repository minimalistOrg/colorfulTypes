import { expect, test, describe, it } from 'vitest'
import { buildArrowFunction, buildInterface } from '../parser'
import { emptySyntaxNode, mockQueryCapture, mockSyntaxNode } from './mocks'

test('build interface', () => {
  const interfaceCapture = mockQueryCapture({
    name: 'definition.interface',
    children: [
      emptySyntaxNode(),
      mockSyntaxNode({
        text: 'MyInterface',
        type: 'type_identifier',
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
          type: 'variable_declarator',
          children: [
            mockSyntaxNode({ text: 'arrowFunctionName'}),
            mockSyntaxNode({ text: '='}),
            mockSyntaxNode({
              text: '(): void => {}',
              children: [
                mockSyntaxNode({
                  text: '()',
                  type: 'formal_parameters',
                  children: [
                    mockSyntaxNode({ text: '(' }),
                    mockSyntaxNode({ text: ')' }),
                  ],
                }),
                mockSyntaxNode({
                  text: ': void',
                  type: 'type_annotation'
                }),
                mockSyntaxNode({ text: '=>' }),
                mockSyntaxNode({ text: '{}' }),
              ]
            }),
          ],
        })
      ]
    });

    expect(buildArrowFunction(functionCapture)).toStrictEqual({
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

  it('builds an arrow function with return type', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.function',
      children: [
        mockSyntaxNode({ text: 'const' }),
        mockSyntaxNode({
          text: 'arrowFunctionName = (): string => {}',
          type: 'variable_declarator',
          children: [
            mockSyntaxNode({ text: 'arrowFunctionName'}),
            mockSyntaxNode({ text: '='}),
            mockSyntaxNode({
              text: '(): string => {}',
              children: [
                mockSyntaxNode({
                  text: '()',
                  type: 'formal_parameters',
                  children: [
                    mockSyntaxNode({ text: '(' }),
                    mockSyntaxNode({ text: ')' }),
                  ],
                }),
                mockSyntaxNode({
                  text: ': string',
                  type: 'type_annotation',
                  children: [
                    mockSyntaxNode({ text: ':' }),
                    mockSyntaxNode({
                      text: 'string',
                      type: 'predefined_type',
                    }),
                  ],
                }),
                mockSyntaxNode({ text: '=>' }),
                mockSyntaxNode({ text: '{}' }),
              ]
            }),
          ],
        })
      ]
    });

    expect(buildArrowFunction(functionCapture)).toStrictEqual({
      name: 'arrowFunctionName',
      parameters: [],
      returnType: {
        type: 'string',
        predefinedType: true,
      },
      codebasePosition: {
        start: { row: 0, column: 0 },
        end: { row: 0, column: 0 }
      }
    });
  });

  it('builds an arrow function with params', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.function',
      children: [
        mockSyntaxNode({ text: 'const' }),
        mockSyntaxNode({
          text: 'arrowFunctionName = (a: string, b: number): void => {}',
          type: 'variable_declarator',
          children: [
            mockSyntaxNode({ text: 'arrowFunctionName'}),
            mockSyntaxNode({ text: '='}),
            mockSyntaxNode({
              text: '(a: string, b: number)',
              children: [
                mockSyntaxNode({
                  text: '(a: string, b: number)',
                  type: 'formal_parameters',
                  children: [
                    mockSyntaxNode({ text: '(' }),
                    mockSyntaxNode({
                      text: 'a: string',
                      type: 'required_parameter',
                      children: [
                        mockSyntaxNode({ text: 'a'}),
                        mockSyntaxNode({
                          text: ': string',
                          children: [
                            mockSyntaxNode({ text: ':'}),
                            mockSyntaxNode({
                              text: 'string',
                              type: 'predefined_type',
                            }),
                          ]
                        }),
                      ]
                    }),
                    mockSyntaxNode({ text: ',' }),
                    mockSyntaxNode({
                      text: 'b: number',
                      type: 'required_parameter',
                      children: [
                        mockSyntaxNode({ text: 'b'}),
                        mockSyntaxNode({
                          text: ': number',
                          children: [
                            mockSyntaxNode({ text: ':'}),
                            mockSyntaxNode({
                              text: 'number',
                              type: 'predefined_type',
                            }),
                          ]
                        }),
                      ]
                    }),
                    mockSyntaxNode({ text: ')' }),
                  ],
                }),
                mockSyntaxNode({
                  text: ': void',
                  type: 'type_annotation'
                }),
                mockSyntaxNode({ text: '=>' }),
                mockSyntaxNode({ text: '{}' }),
              ]
            }),
          ],
        })
      ]
    });

    expect(buildArrowFunction(functionCapture)).toStrictEqual({
      name: 'arrowFunctionName',
      parameters: [
        {
          name: "a",
          predefinedType: true,
          type: "string",
        },
        {
          name: "b",
          predefinedType: true,
          type: "number",
        },
      ],
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
