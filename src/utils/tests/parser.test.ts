import { expect, test, describe, it } from 'vitest'
import { buildArrowFunction, buildEnum, buildFunction, buildInterface } from '../parser'
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

test('build class', () => {
  const classCapture = mockQueryCapture({
    name: 'definition.class',
    children: [
      emptySyntaxNode(),
      mockSyntaxNode({
        text: 'MyClass',
        type: 'type_identifier',
        children: [],
      })
    ]
  });

  expect(buildInterface(classCapture)).toStrictEqual({
    name: 'MyClass',
    codebasePosition: {
      start: { row: 0, column: 0 },
      end: { row: 0, column: 0 }
    }
  });
});

test('build type', () => {
  const typeAliasCapture = mockQueryCapture({
    name: 'definition.typeAlias',
    children: [
      mockSyntaxNode({
        text: 'type',
        type: 'type',
      }),
      mockSyntaxNode({
        text: 'MyTypeAlias',
        type: 'type_identifier',
      }),
      mockSyntaxNode({
        text: '=',
        type: '=',
      }),
      mockSyntaxNode({
        text: 'number',
        type: 'predefined_type',
      }),
    ]
  });

  expect(buildInterface(typeAliasCapture)).toStrictEqual({
    name: 'MyTypeAlias',
    codebasePosition: {
      start: { row: 0, column: 0 },
      end: { row: 0, column: 0 }
    }
  });
});

test('build enum', () => {
  const enumCapture = mockQueryCapture({
    name: 'definition.enum',
    children: [
      mockSyntaxNode({
        text: 'const',
        type: 'const',
      }),
      mockSyntaxNode({
        text: 'enum',
        type: 'enum',
      }),
      mockSyntaxNode({
        text: 'MyEnum',
        type: 'identifier',
        children: [],
      }),
      mockSyntaxNode({
        text: '{ }',
        type: 'enum_body',
      }),
    ]
  });

  expect(buildEnum(enumCapture)).toStrictEqual({
    name: 'MyEnum',
    codebasePosition: {
      start: { row: 0, column: 0 },
      end: { row: 0, column: 0 }
    }
  });
});

describe('build arrow function', () => {
  it('parses arrow function with no params', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.arrowFunction',
      text: 'arrowFunctionName = (): void => {}',
      type: 'variable_declarator',
      children: [
        mockSyntaxNode({
          text: 'arrowFunctionName',
          type: 'identifier',
        }),
        mockSyntaxNode({ text: '='}),
        mockSyntaxNode({
          text: '(): void => {}',
          type: 'arrow_function',
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

  it('parses arrow function with return type', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.arrowFunction',
      text: 'arrowFunctionName = (): string => {}',
      type: 'variable_declarator',
      children: [
        mockSyntaxNode({
          text: 'arrowFunctionName',
          type: 'identifier',
        }),
        mockSyntaxNode({ text: '='}),
        mockSyntaxNode({
          text: '(): string => {}',
          type: 'arrow_function',
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

  it('parses arrow function with params', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.arrowFunction',
      text: 'arrowFunctionName = (a: string, b: number): void => {}',
      type: 'variable_declarator',
      children: [
        mockSyntaxNode({
          text: 'arrowFunctionName',
          type: 'identifier',
        }),
        mockSyntaxNode({ text: '='}),
        mockSyntaxNode({
          text: '(a: string, b: number)',
          type: 'arrow_function',
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

describe('build function', () => {
  it('parses function with no params', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.function',
      text: 'function noParams(): void {}',
      type: 'function_declaration',
      children: [
        mockSyntaxNode({ text: 'function' }),
        mockSyntaxNode({
          text: 'functionName',
          type: 'identifier',
        }),
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
        mockSyntaxNode({ text: '{}' }),
      ],
    });

    expect(buildFunction(functionCapture)).toStrictEqual({
      name: 'functionName',
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

  it('parses function with return type', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.function',
      text: 'function noParams(): void {}',
      type: 'function_declaration',
      children: [
        mockSyntaxNode({ text: 'function' }),
        mockSyntaxNode({
          text: 'functionName',
          type: 'identifier',
        }),
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
        mockSyntaxNode({ text: '{}' }),
      ],
    });

    expect(buildFunction(functionCapture)).toStrictEqual({
      name: 'functionName',
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

  it('parses function with params', () => {
    const functionCapture = mockQueryCapture({
      name: 'definition.function',
      text: 'function noParams(): void {}',
      type: 'function_declaration',
      children: [
        mockSyntaxNode({ text: 'function' }),
        mockSyntaxNode({
          text: 'functionName',
          type: 'identifier',
        }),
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
          type: 'type_annotation',
          children: [
            mockSyntaxNode({ text: ':' }),
            mockSyntaxNode({
              text: 'void',
              type: 'predefined_type',
            }),
          ],
        }),
        mockSyntaxNode({ text: '{}' }),
      ],
    });

    expect(buildFunction(functionCapture)).toStrictEqual({
      name: 'functionName',
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
