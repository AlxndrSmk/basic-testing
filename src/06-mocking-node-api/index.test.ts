import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mock = jest.fn();

    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mock, 50);
    expect(setTimeout).toBeCalledWith(mock, 50);
  });

  test('should call callback only after timeout', () => {
    const mock = jest.fn();

    doStuffByTimeout(mock, 50);
    expect(mock).not.toBeCalled();
    jest.advanceTimersByTime(50);
    expect(mock).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const mock = () => ({});

    doStuffByInterval(mock, 50);
    expect(spy).toHaveBeenCalledWith(mock, 50);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mock = { callback: () => ({}) };
    const spy: jest.SpyInstance<object, string[]> = jest.spyOn(
      mock,
      'callback',
    );
    doStuffByTimeout(mock.callback, 50);

    expect(spy).not.toBeCalled();

    jest.advanceTimersByTime(50);
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  const filePath = './index.js';
  const fileContent = "console.log('Hello world')";

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);
    expect(spy).toHaveBeenCalledWith(__dirname, filePath);
    spy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(filePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(filePath);
    expect(result).toEqual(fileContent);
  });
});
