import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let result;

    result = simpleCalculator({ a: 1, b: 4, action: Action.Add });
    expect(result).toBe(5);
    result = simpleCalculator({ a: -5, b: 5, action: Action.Add });
    expect(result).toBe(0);
    result = simpleCalculator({ a: 5, b: 0, action: Action.Add });
    expect(result).toBe(5);
    result = simpleCalculator({ a: 2.5, b: 3.14, action: Action.Add });
    expect(result).toBeCloseTo(5.64, 2);
    result = simpleCalculator({ a: 'hello', b: 2, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should subtract two numbers', () => {
    let result;

    result = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });
    expect(result).toBe(3);
    result = simpleCalculator({ a: 5, b: -2, action: Action.Subtract });
    expect(result).toBe(7);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    let result;

    result = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(result).toBe(5);
    result = simpleCalculator({ a: 5, b: 0, action: Action.Divide });
    expect(result).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: 'some action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let result;

    result = simpleCalculator({ a: '1', b: 4, action: Action.Add });
    expect(result).toBeNull();
    result = simpleCalculator({ a: null, b: 2, action: Action.Subtract });
    expect(result).toBeNull();
    result = simpleCalculator({ a: { a: 1 }, b: 3, action: Action.Multiply });
    expect(result).toBeNull();
    result = simpleCalculator({ a: false, b: 2, action: Action.Divide });
    expect(result).toBeNull();
    result = simpleCalculator({
      a: [2, 4],
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBeNull();
  });
});
