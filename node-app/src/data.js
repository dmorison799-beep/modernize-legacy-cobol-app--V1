'use strict';

const INITIAL_BALANCE = 1000.00;

/**
 * DataStore — in-memory persistence layer.
 * Maps to data.cob (DataProgram) which stores STORAGE-BALANCE
 * and exposes READ / WRITE operations via the LINKAGE SECTION.
 *
 * Supports INITIAL_BALANCE environment variable override for deployment config.
 */
class DataStore {
  constructor(initialBalance) {
    if (initialBalance !== undefined) {
      this._balance = initialBalance;
    } else {
      const envBalance = process.env.INITIAL_BALANCE
        ? parseFloat(process.env.INITIAL_BALANCE)
        : NaN;
      this._balance = !isNaN(envBalance) ? envBalance : INITIAL_BALANCE;
    }
  }

  read() {
    return this._balance;
  }

  write(balance) {
    this._balance = balance;
  }
}

module.exports = { DataStore, INITIAL_BALANCE };
