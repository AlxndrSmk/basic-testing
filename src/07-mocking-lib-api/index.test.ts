import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const mockData = { data: 'some data' };
const relativePath = '/users';

const setupAxiosMocks = () => {
  jest.spyOn(axios, 'create').mockReturnThis();
  jest.spyOn(axios, 'get').mockResolvedValue(mockData);
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    setupAxiosMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(baseURL);
    expect(result).toEqual(mockData.data);
  });
});
