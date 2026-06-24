'use strict';

/**
 * DataStore - Equivalent to data.cob (DataProgram)
 * Manages persistent balance storage with read/write operations.
 */
class DataStore {
  constructor(initialBalance = 1000.00) {
    this._balance = initialBalance;
  }

  read() {
    return this._balance;
  }

  write(balance) {
    this._balance = balance;
  }
}

module.exports = DataStore;
