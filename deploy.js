const client = require('scp2');
const chalk = require('chalk');

client.scp(
  'build/',
  {
    host: 'liuyao.info',
    username: 'root',
    privateKey: require('fs').readFileSync('/Users/liuyao/.ssh/id_rsa'),
    passphrase: 'private_key_password',
    path: '/root/max'
  },
  function(err) {
    if (!err) {
      console.log(chalk.green('已成功布署至 https://max.liuyao.info/'));
    } else {
      console.log(err);
      console.error(chalk.red('布署失败'));
    }
  }
);
