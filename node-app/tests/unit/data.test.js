'use strict';

const DataStore = require('../../src/data');

describe('DataStore', () => {
  let dataStore;

  beforeEach(() => {
    dataStore = new DataStore();
  });

  test('should initialize with default balance of 1000.00', () => {
    expect(dataStore.read()).toBe(1000.00);
  });

  test('should initialize with custom balance', () => {
    const store = new DataStore(500.00);
    expect(store.read()).toBe(500.00);
  });

  test('should read current balance', () => {
    expect(dataStore.read()).toBe(1000.00);
  });

  test('should write and persist new balance', () => {
    dataStore.write(1500.00);
    expect(dataStore.read()).toBe(1500.00);
  });

  test('should handle zero balance', () => {
    dataStore.write(0);
    expect(dataStore.read()).toBe(0);
  });

  test('should handle decimal precision', () => {
    dataStore.write(1234.56);
    expect(dataStore.read()).toBe(1234.56);
  });
});
