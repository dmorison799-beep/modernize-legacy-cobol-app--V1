'use strict';

const DataStore = require('../../src/data');
const Operations = require('../../src/operations');

describe('Operations', () => {
  let dataStore;
  let operations;

  beforeEach(() => {
    dataStore = new DataStore(1000.00);
    operations = new Operations(dataStore);
  });

  describe('TC-1.1: View Balance', () => {
    test('should display current balance', () => {
      const result = operations.viewBalance();
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Current balance: 1000.00');
    });

    test('should reflect updated balance after operations', () => {
      operations.credit(200);
      const result = operations.viewBalance();
      expect(result.balance).toBe(1200.00);
      expect(result.message).toBe('Current balance: 1200.00');
    });
  });

  describe('TC-2.1: Credit Account with Valid Amount', () => {
    test('should credit account with valid amount', () => {
      const result = operations.credit(100.00);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1100.00);
      expect(result.message).toBe('Amount credited. New balance: 1100.00');
    });

    test('should credit account with string amount', () => {
      const result = operations.credit('200.50');
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1200.50);
    });

    test('should credit account with large amount', () => {
      const result = operations.credit(999999.99);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1000999.99);
    });
  });

  describe('TC-2.2: Credit Account with Zero Amount', () => {
    test('should leave balance unchanged when crediting zero', () => {
      const result = operations.credit(0);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Amount credited. New balance: 1000.00');
    });
  });

  describe('TC-3.1: Debit Account with Valid Amount', () => {
    test('should debit account with valid amount', () => {
      const result = operations.debit(50.00);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(950.00);
      expect(result.message).toBe('Amount debited. New balance: 950.00');
    });

    test('should debit account with string amount', () => {
      const result = operations.debit('300.00');
      expect(result.success).toBe(true);
      expect(result.balance).toBe(700.00);
    });

    test('should debit entire balance', () => {
      const result = operations.debit(1000.00);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(0);
    });
  });

  describe('TC-3.2: Debit Account with Amount Greater Than Balance', () => {
    test('should reject debit exceeding balance', () => {
      const result = operations.debit(2000.00);
      expect(result.success).toBe(false);
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Insufficient funds for this debit.');
    });

    test('should reject debit slightly exceeding balance', () => {
      const result = operations.debit(1000.01);
      expect(result.success).toBe(false);
      expect(result.balance).toBe(1000.00);
    });
  });

  describe('TC-3.3: Debit Account with Zero Amount', () => {
    test('should leave balance unchanged when debiting zero', () => {
      const result = operations.debit(0);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1000.00);
      expect(result.message).toBe('Amount debited. New balance: 1000.00');
    });
  });

  describe('Invalid Input Handling', () => {
    test('should reject negative credit amount', () => {
      const result = operations.credit(-100);
      expect(result.success).toBe(false);
      expect(result.balance).toBe(1000.00);
    });

    test('should reject negative debit amount', () => {
      const result = operations.debit(-50);
      expect(result.success).toBe(false);
      expect(result.balance).toBe(1000.00);
    });

    test('should reject non-numeric credit', () => {
      const result = operations.credit('abc');
      expect(result.success).toBe(false);
      expect(result.balance).toBe(1000.00);
    });

    test('should reject non-numeric debit', () => {
      const result = operations.debit('xyz');
      expect(result.success).toBe(false);
      expect(result.balance).toBe(1000.00);
    });
  });
});
