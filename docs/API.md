# API Reference

## DataStore (`src/data.js`)

In-memory data persistence layer. Equivalent to COBOL's `DataProgram`.

### Constructor

```javascript
const store = new DataStore(initialBalance = 1000.00);
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `initialBalance` | `number` | `1000.00` | Starting account balance |

### Methods

#### `read()`

Returns the current stored balance.

```javascript
const balance = store.read(); // 1000.00
```

**Returns:** `number` - Current balance

#### `write(balance)`

Updates the stored balance.

```javascript
store.write(1500.00);
```

| Parameter | Type | Description |
|---|---|---|
| `balance` | `number` | New balance to store |

---

## Operations (`src/operations.js`)

Business logic layer handling credit, debit, and balance viewing. Equivalent to COBOL's `Operations` program.

### Constructor

```javascript
const ops = new Operations(dataStore);
```

| Parameter | Type | Description |
|---|---|---|
| `dataStore` | `DataStore` | Injected data persistence instance |

### Methods

#### `viewBalance()`

Reads and returns the current balance.

```javascript
const result = ops.viewBalance();
// { balance: 1000.00, message: "Current balance: 1000.00" }
```

**Returns:** `Object`
- `balance` (`number`): Current balance value
- `message` (`string`): Formatted display message

#### `credit(amount)`

Adds funds to the account.

```javascript
const result = ops.credit(200);
// { success: true, balance: 1200.00, message: "Amount credited. New balance: 1200.00" }
```

| Parameter | Type | Description |
|---|---|---|
| `amount` | `number\|string` | Amount to credit (parsed as float) |

**Returns:** `Object`
- `success` (`boolean`): Whether the operation succeeded
- `balance` (`number`): Balance after operation
- `message` (`string`): Formatted result message

**Error cases:**
- Negative amount: `{ success: false, message: "Invalid amount." }`
- Non-numeric: `{ success: false, message: "Invalid amount." }`

#### `debit(amount)`

Withdraws funds from the account with insufficient funds protection.

```javascript
const result = ops.debit(50);
// { success: true, balance: 950.00, message: "Amount debited. New balance: 950.00" }

const failed = ops.debit(99999);
// { success: false, balance: 1000.00, message: "Insufficient funds for this debit." }
```

| Parameter | Type | Description |
|---|---|---|
| `amount` | `number\|string` | Amount to debit (parsed as float) |

**Returns:** `Object`
- `success` (`boolean`): Whether the operation succeeded
- `balance` (`number`): Balance after operation
- `message` (`string`): Formatted result message

---

## AccountApp (`src/main.js`)

CLI application controller managing the menu loop and user interaction. Equivalent to COBOL's `MainProgram`.

### Constructor

```javascript
const app = new AccountApp(input = process.stdin, output = process.stdout);
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `input` | `Readable` | `process.stdin` | Input stream |
| `output` | `Writable` | `process.stdout` | Output stream |

### Methods

#### `run()`

Starts the application main loop. Displays menu, processes choices until exit.

```javascript
await app.run();
```

**Returns:** `Promise<void>` - Resolves when user exits

#### `handleChoice(choice)`

Processes a single menu selection.

```javascript
await app.handleChoice('1'); // View balance
await app.handleChoice('2'); // Credit (prompts for amount)
await app.handleChoice('3'); // Debit (prompts for amount)
await app.handleChoice('4'); // Exit
```

| Parameter | Type | Description |
|---|---|---|
| `choice` | `string` | Menu option ('1'-'4') |

### Properties

| Property | Type | Description |
|---|---|---|
| `running` | `boolean` | Whether the app loop is active |
| `dataStore` | `DataStore` | Internal data store instance |
| `operations` | `Operations` | Internal operations instance |
