enum Order {
  OPEN,
  CLOSED
}

interface Bracket {
  symbol: '(' | ')' | '{' | '}' | '[' | ']';
  type: '()' | '{}' | '[]';
  order: Order;
}


interface Stack {
  stack: Array<Object>;
  size: number;
  push(element: Object): void;
  peek(): null | Object;
  pop(): null | Object;
}

class BracketsStack implements Stack {
  stack: Bracket[];
  size: number;

  constructor(stack: Bracket[]) {
    this.stack = stack
    this.size = stack.length
  }

  static createEmptyStack() {
    return new this([])
  }
  /**
   * Add an element a the top of the stack.
   */
  push(bracket: Bracket): void {
    this.stack.push(bracket)
    this.size++
  }
  /**
   * Returns the last element without mutating the stack, 
   * if empty returns null.
   */
  peek(): Bracket | null {
    return this.size === 0 ? null : this.stack[this.size - 1]
  }
  /**
   * Returns the last element and removes it from the stack,
   * if empty return null.
   */
  pop(): Bracket | null {
    if (this.size === 0) return null

    this.size--
    return this.stack.pop() as Bracket
  }

}

const bracketsMap = new Map<string, Bracket>([
  ['(', { symbol: '(', type: '()', order: Order.OPEN  } as Bracket],
  [')', { symbol: ')', type: '()', order: Order.CLOSED  } as Bracket],
  ['[', { symbol: '[', type: '[]', order: Order.OPEN  } as Bracket],
  [']', { symbol: ']', type: '[]', order: Order.CLOSED  } as Bracket],
  ['{', { symbol: '{', type: '{}', order: Order.OPEN  } as Bracket],
  ['}', { symbol: '}', type: '{}', order: Order.CLOSED } as Bracket],
])

function isValid(s: string): boolean {
  const charactesList = s.split('').map((bracketChar) => (bracketsMap.get(bracketChar))) as Bracket[]

  const charactersStack = new BracketsStack(charactesList)
  const auxStack = BracketsStack.createEmptyStack()

  auxStack.push(charactersStack.pop() as Bracket)

  while(charactersStack.size > 0) {
    
    const firstStackPeek = charactersStack.peek() as Bracket
    const auxStackPeek = auxStack.peek() as Bracket
    
    const areSameType = firstStackPeek.type === auxStackPeek.type
    const haveCorrectOrder = firstStackPeek.order === Order.OPEN && auxStackPeek.order === Order.CLOSED
    
    if (areSameType && haveCorrectOrder) {
      charactersStack.pop()
      auxStack.pop()
    } else {
      auxStack.push(charactersStack.pop() as Bracket)
    }

    if (auxStack.size === 0 && charactersStack.size !== 0) {
      auxStack.push(charactersStack.pop() as Bracket)
    }
  }

  return auxStack.size === 0
};

// Casos de prueba
console.log(')', isValid(')'))
console.log('', isValid(''))
console.log(')(){}', isValid(')(){}'))
console.log('()', isValid('()'))
console.log('()[]{}', isValid('()[]{}'))
console.log('(]', isValid('(]'))
console.log('(({})[])', isValid('(({})[])'))
console.log('(({})][)', isValid('(({})][)'))

