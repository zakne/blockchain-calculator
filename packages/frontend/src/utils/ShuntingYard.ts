enum Operator {
    Add = '+',
    Subtract = '-',
    Multiply = '*',
    Divide = '/',
    XOR = '^',
}

type Token = string | Operator;

/**
 *  This class implements Shunting yard algorithm
 *  https://en.wikipedia.org/wiki/Shunting_yard_algorithm
 * 
 *  The evaluation part is done on blockchain
 **/
export class ShuntingYard {
    private static readonly opPrec: Record<Operator, number> = {
        [Operator.Add]: 1,
        [Operator.Subtract]: 1,
        [Operator.Multiply]: 2,
        [Operator.Divide]: 2,
        [Operator.XOR]: 3,
    };

    private static readonly leftAssocOp: Set<Operator> = new Set([
        Operator.Add,
        Operator.Subtract,
        Operator.Multiply,
        Operator.Divide,
        Operator.XOR,
    ]);

    static toRPN(expression: string): Token[] {
        const output: Token[] = [];
        const op: (Operator | '(')[] = [];
        const tokens = this.tokenize(expression);

        for (const token of tokens) {
            if (this.isNumber(token)) {
                output.push(token);
            } else if (this.isOp(token)) {
                while (
                    op.length > 0 &&
                    this.shouldPop(op[op.length - 1] as Operator, token as Operator)
                ) {
                    output.push(op.pop()!);
                }
                op.push(token as Operator);
            } else if (token === '(') {
                op.push('(');
            } else if (token === ')') {
                while (op.length > 0 && op[op.length - 1] !== '(') {
                    output.push(op.pop()!);
                }
                op.pop();
            } else {
                throw new Error(`Unknown token: ${token}`);
            }
        }

        while (op.length > 0) {
            output.push(op.pop()!);
        }

        return output;
    }

    private static tokenize(expression: string): string[] {
        return expression.match(/\d+\.\d+|\d+|[-+*/^()**]/g) || [];
    }

    private static isNumber(token: string): boolean {
        return !isNaN(parseFloat(token));
    }

    private static isOp(token: string): boolean {
        return Object.values(Operator).includes(token as Operator);
    }

    private static shouldPop(top: Operator, currentOp: Operator): boolean {
        return (
            this.opPrec[currentOp] < this.opPrec[top] ||
            (this.opPrec[currentOp] === this.opPrec[top] &&
                this.isLeft(currentOp))
        );
    }

    private static isLeft(op: Operator): boolean {
        return this.leftAssocOp.has(op);
    }
}
