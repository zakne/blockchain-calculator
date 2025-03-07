import { expect, test } from 'vitest';
import { ShuntingYard } from './ShuntingYard';

test('test RPN', () => {
    const expression = '3 + 4 * 2 / (1 - 5)';
    const rpn = ShuntingYard.toRPN(expression);
    expect(rpn).toStrictEqual(["3", "4", "2", "*", "1", "5", "-", "/", "+"]);
});