'use strict';

const DataStore = require('../../src/data');
const Operations = require('../../src/operations');
const AccountApp = require('../../src/main');
const { Readable, Writable } = require('stream');

describe('Integration: Accounting System', () => {
  let dataStore;
  let operations;

  beforeEach(() => {
    dataStore = new DataStore(1000.00);
    operations = new Operations(dataStore);
  });

  describe('Full Workflow', () => {
    test('should handle credit then view balance', () => {
      operations.credit(500.00);
      const result = operations.viewBalance();
      expect(result.balance).toBe(1500.00);
    });

    test('should handle debit then view balance', () => {
      operations.debit(200.00);
      const result = operations.viewBalance();
      expect(result.balance).toBe(800.00);
    });

    test('should handle multiple sequential operations', () => {
      operations.credit(500.00);
      operations.debit(200.00);
      operations.credit(100.00);
      operations.debit(50.00);
      const result = operations.viewBalance();
      expect(result.balance).toBe(1350.00);
    });

    test('should maintain balance after failed debit', () => {
      operations.credit(100.00);
      operations.debit(5000.00); // should fail
      const result = operations.viewBalance();
      expect(result.balance).toBe(1100.00); // only credit applied
    });

    test('should handle debit to zero then reject further debits', () => {
      operations.debit(1000.00);
      const result = operations.debit(1.00);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Insufficient funds for this debit.');
      expect(operations.viewBalance().balance).toBe(0);
    });
  });

  describe('TC-4.1: Application Exit', () => {
    test('should exit gracefully with choice 4', async () => {
      const input = new Readable({ read() {} });
      const outputChunks = [];
      const output = new Writable({
        write(chunk, encoding, callback) {
          outputChunks.push(chunk.toString());
          callback();
        }
      });

      const app = new AccountApp(input, output);

      const runPromise = app.run();

      // Simulate user entering '4' to exit
      input.push('4\n');

      await runPromise;

      const fullOutput = outputChunks.join('');
      expect(fullOutput).toContain('Account Management System');
      expect(fullOutput).toContain('Exiting the program. Goodbye!');
      expect(app.running).toBe(false);
    });

    test('should handle view balance then exit', async () => {
      const input = new Readable({ read() {} });
      const outputChunks = [];
      const output = new Writable({
        write(chunk, encoding, callback) {
          outputChunks.push(chunk.toString());
          callback();
        }
      });

      const app = new AccountApp(input, output);

      const runPromise = app.run();

      // View balance then exit
      input.push('1\n');
      // Small delay to allow processing
      await new Promise(resolve => setTimeout(resolve, 50));
      input.push('4\n');

      await runPromise;

      const fullOutput = outputChunks.join('');
      expect(fullOutput).toContain('Current balance: 1000.00');
      expect(fullOutput).toContain('Exiting the program. Goodbye!');
    });

    test('should handle invalid choice then exit', async () => {
      const input = new Readable({ read() {} });
      const outputChunks = [];
      const output = new Writable({
        write(chunk, encoding, callback) {
          outputChunks.push(chunk.toString());
          callback();
        }
      });

      const app = new AccountApp(input, output);

      const runPromise = app.run();

      input.push('9\n');
      await new Promise(resolve => setTimeout(resolve, 50));
      input.push('4\n');

      await runPromise;

      const fullOutput = outputChunks.join('');
      expect(fullOutput).toContain('Invalid choice, please select 1-4.');
      expect(fullOutput).toContain('Exiting the program. Goodbye!');
    });
  });

  describe('Data Persistence Across Operations', () => {
    test('should persist data correctly through DataStore', () => {
      const store = new DataStore(0);
      const ops = new Operations(store);

      ops.credit(100);
      ops.credit(200);
      ops.debit(50);

      expect(store.read()).toBe(250);
      expect(ops.viewBalance().balance).toBe(250);
    });
  });
});
