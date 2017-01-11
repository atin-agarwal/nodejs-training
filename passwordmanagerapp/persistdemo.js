console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

storage.setItemSync('accounts', [{
  username: 'Atin',
  balance:  200
},{
  username: 'Shashi',
  balance:  50
}]);

var accounts = storage.getItemSync('accounts');

accounts.push({
  username: 'Bob',
  balance:  200
});

storage.setItemSync('accounts', accounts);

console.log(accounts);
