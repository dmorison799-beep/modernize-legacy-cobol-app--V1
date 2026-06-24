'use strict';

/**
 * DataStore - Equivalent to data.cob (DataProgram)
 * Manages persistent balance storage with read/write operations.
 */
class DataStore {
  constructor(initialBalance) {
    const envBalance = typeof process !== 'undefined' && process.env && process.env.INITIAL_BALANCE
      ? parseFloat(process.env.INITIAL_BALANCE)
      : NaN;
    const defaultBalance = !isNaN(envBalance) ? envBalance : 1000.00;
    this._balance = initialBalance !== undefined ? initialBalance : defaultBalance;
  }

  read() {
    return this._balance;
  }

  write(balance) {
    this._balance = balance;
  }
}

module.exports = DataStore;
