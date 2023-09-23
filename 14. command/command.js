class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(
      `Deposited amount ${amount}, now the balance is ${this.balance}`
    );
    return true;
  }

  withdraw(amount) {
    if (this.balance - amount >= BankAccount.overdraftLimit) {
      this.balance -= amount;
      console.log(
        `Withdrew amount ${amount}, now the balance is ${this.balance}`
      );
      return true;
    }
    return false;
  }

  toString() {
    return `Balance in account ${this.balance}`;
  }
}

BankAccount.overdraftLimit = -500;

const bb = new BankAccount(100);
bb.deposit(100);
bb.toString();

/**
 * In command pattern we've to record all these operations so that we may roll back if needed
 * Firstly, we'll create actions for out BankAccount actions
 * Then, we'll create Command class for this, in which we'll pass the commands and it will perform
 * respective operation accordingly.
 */

let Action = Object.freeze({
  deposit: 1,
  withdraw: 2,
});

class BankAccountCommand {
  constructor(account, action, amount) {
    this.account = account;
    this.action = action;
    this.amount = amount;
  }
  call() {
    switch (this.action) {
      case Action.deposit:
        this.account.deposit(this.amount);
        break;
      case Action.withdraw:
        this.account.withdraw(this.amount);
        break;
    }
  }
}

/**
 * Now BackAccountCommand will handle all the operations internally
 */

const bankAccountCommand = new BankAccountCommand(bb, Action.deposit, 1000);

bankAccountCommand.call();
bb.toString();

/**
 * We'll now be implementing undo operation,
 * Inorder to do that, we'll need a flag to check if the original operation succeeded
 * because only if the command succeeded we'll be performing the undo
 */

class BankAccountCommandUndo {
  constructor(account, action, amount) {
    this.account = account;
    this.action = action;
    this.amount = amount;
    this.succeeded = false;
  }
  call() {
    switch (this.action) {
      case Action.deposit:
        this.account.deposit(this.amount);
        this.succeeded = true;
        break;
      case Action.withdraw:
        this.succeeded = this.account.withdraw(this.amount);
        break;
    }
  }
  undo() {
    if (this.succeeded) {
      switch (this.action) {
        case Action.deposit:
          this.account.withdraw(this.amount);
          break;
        case Action.withdraw:
          this.account.deposit(this.amount);
          break;
      }
    }
  }
}

const bankAccountCommandUndo = new BankAccountCommandUndo(
  bb,
  Action.withdraw,
  1900
);
bankAccountCommandUndo.call(); // Both will fail as 1900 isn't withdrawable
bankAccountCommandUndo.undo();

const bankAccountCommandUndo2 = new BankAccountCommandUndo(
  bb,
  Action.withdraw,
  100
);
bankAccountCommandUndo2.call(); // Both will succeed
bankAccountCommandUndo2.undo();
