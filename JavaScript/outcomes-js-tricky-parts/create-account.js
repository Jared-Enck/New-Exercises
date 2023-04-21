function createAccount(pin, amount = 0) {
  this.pin = pin;
  this.amount = amount;
}

createAccount.prototype.checkBalance = function (pin) {
  if (pin !== this.pin) return 'Invalid PIN.';
  return `$${this.amount}`
}
createAccount.prototype.deposit = function (pin, deposit) {
  if (pin !== this.pin) return 'Invalid PIN.';
  this.amount += deposit;
  return `Successfully deposited $${deposit}. Current balance: $${this.amount}.`
}
createAccount.prototype.withdraw = function (pin, withdraw) {
  if (pin !== this.pin) return 'Invalid PIN.';
  if (withdraw > this.amount) {
    return 'Withdrawal amount exceeds account balance. Transaction cancelled.'
  }
  this.amount -= withdraw;
  return `Successfully withdrew $${withdraw}. Current balance: $${this.amount}.`
}
createAccount.prototype.changePin = function (pin, newPin) {
  if (pin !== this.pin) return 'Invalid PIN.';
  this.pin = newPin
  return 'PIN successfully changed!'
}


module.exports = { createAccount };
