import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(75)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(50);
    const otherAccount = getBankAccount(0);
    expect(() => account.transfer(75, otherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(50);
    expect(() => account.transfer(25, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(25);
    expect(account.getBalance()).toBe(75);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    account1.transfer(25, account2);
    expect(account1.getBalance()).toBe(75);
    expect(account2.getBalance()).toBe(75);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = getBankAccount(700);
    const balance = jest.spyOn(account, 'fetchBalance');

    balance.mockResolvedValue(45);
    const fetchBalance = await account.fetchBalance();
    expect(typeof fetchBalance).toEqual('number');
    balance.mockClear();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const balance = jest.spyOn(account, 'fetchBalance');

    balance.mockResolvedValue(10);
    const fetchBalance = await account.fetchBalance();
    expect(fetchBalance).toEqual(10);
    balance.mockClear();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    const balance = jest.spyOn(account, 'fetchBalance');

    balance.mockResolvedValue(null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
    balance.mockClear();
  });
});
