import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const expectedValue = 'Alex';
    const result = await resolveValue(expectedValue);
    expect(result).toBe(expectedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const expectedErrorMessage = 'Error!';
    expect(() => throwError(expectedErrorMessage)).toThrow(
      expectedErrorMessage,
    );
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});
