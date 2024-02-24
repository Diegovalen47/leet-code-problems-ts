"use strict";
var Order;
(function (Order) {
    Order[Order["OPEN"] = 0] = "OPEN";
    Order[Order["CLOSED"] = 1] = "CLOSED";
})(Order || (Order = {}));
class BracketsStack {
    constructor(stack) {
        this.stack = stack;
        this.size = stack.length;
    }
    static createEmptyStack() {
        return new this([]);
    }
    /**
     * Add an element a the top of the stack.
     */
    push(bracket) {
        this.stack.push(bracket);
        this.size++;
    }
    /**
     * Returns the last element without mutating the stack,
     * if empty returns null.
     */
    peek() {
        return this.size === 0 ? null : this.stack[this.size - 1];
    }
    /**
     * Returns the last element and removes it from the stack,
     * if empty return null.
     */
    pop() {
        if (this.size === 0)
            return null;
        this.size--;
        return this.stack.pop();
    }
}
const bracketsMap = new Map([
    ['(', { symbol: '(', type: '()', order: Order.OPEN }],
    [')', { symbol: ')', type: '()', order: Order.CLOSED }],
    ['[', { symbol: '[', type: '[]', order: Order.OPEN }],
    [']', { symbol: ']', type: '[]', order: Order.CLOSED }],
    ['{', { symbol: '{', type: '{}', order: Order.OPEN }],
    ['}', { symbol: '}', type: '{}', order: Order.CLOSED }],
]);
function isValid(s) {
    const charactesList = s.split('').map((bracketChar) => (bracketsMap.get(bracketChar)));
    const charactersStack = new BracketsStack(charactesList);
    const auxStack = BracketsStack.createEmptyStack();
    auxStack.push(charactersStack.pop());
    while (charactersStack.size > 0) {
        const firstStackPeek = charactersStack.peek();
        const auxStackPeek = auxStack.peek();
        const areSameType = firstStackPeek.type === auxStackPeek.type;
        const haveCorrectOrder = firstStackPeek.order === Order.OPEN && auxStackPeek.order === Order.CLOSED;
        if (areSameType && haveCorrectOrder) {
            charactersStack.pop();
            auxStack.pop();
        }
        else {
            auxStack.push(charactersStack.pop());
        }
        if (auxStack.size === 0 && charactersStack.size !== 0) {
            auxStack.push(charactersStack.pop());
        }
    }
    return auxStack.size === 0;
}
;
// Casos de prueba
console.log(')', isValid(')'));
console.log('', isValid(''));
console.log(')(){}', isValid(')(){}'));
console.log('()', isValid('()'));
console.log('()[]{}', isValid('()[]{}'));
console.log('(]', isValid('(]'));
console.log('(({})[])', isValid('(({})[])'));
console.log('(({})][)', isValid('(({})][)'));
//# sourceMappingURL=valid-parentheses.js.map