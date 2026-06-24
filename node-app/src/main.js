'use strict';

const readline = require('readline');
const DataStore = require('./data');
const Operations = require('./operations');

/**
 * AccountApp - Equivalent to main.cob (MainProgram)
 * Handles the CLI menu loop and user interaction.
 */
class AccountApp {
  constructor(input = process.stdin, output = process.stdout) {
    this.dataStore = new DataStore();
    this.operations = new Operations(this.dataStore);
    this.output = output;
    this.rl = readline.createInterface({ input, output });
    this.running = true;
  }

  print(message) {
    this.output.write(message + '\n');
  }

  ask(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => resolve(answer));
    });
  }

  displayMenu() {
    this.print('--------------------------------');
    this.print('Account Management System');
    this.print('1. View Balance');
    this.print('2. Credit Account');
    this.print('3. Debit Account');
    this.print('4. Exit');
    this.print('--------------------------------');
  }

  async handleChoice(choice) {
    switch (choice) {
    case '1': {
      const result = this.operations.viewBalance();
      this.print(result.message);
      break;
    }
    case '2': {
      const amount = await this.ask('Enter credit amount: ');
      const result = this.operations.credit(amount);
      this.print(result.message);
      break;
    }
    case '3': {
      const amount = await this.ask('Enter debit amount: ');
      const result = this.operations.debit(amount);
      this.print(result.message);
      break;
    }
    case '4':
      this.running = false;
      break;
    default:
      this.print('Invalid choice, please select 1-4.');
    }
  }

  async run() {
    while (this.running) {
      this.displayMenu();
      const choice = await this.ask('Enter your choice (1-4): ');
      await this.handleChoice(choice);
    }
    this.print('Exiting the program. Goodbye!');
    this.rl.close();
  }
}

if (require.main === module) {
  const app = new AccountApp();
  app.run();
}

module.exports = AccountApp;
