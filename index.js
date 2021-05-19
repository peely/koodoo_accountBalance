const { accountTypeChecker } = require('./src/accountTypeChecker')
const source_accountBalanceHistory = require('./accountBalanceHistory.json');

console.log(accountTypeChecker(source_accountBalanceHistory))