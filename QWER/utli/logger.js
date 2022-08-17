import chalk from 'chalk';

export const log = (color, msg, dest) => {
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold('[QWER] ') +
      chalk[color](msg + ' ') +
      chalk.dim(dest ?? ''),
  );
};

export const error = (err) => {
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.redBright.bold('[QWER] ') +
      chalk.red('error ') +
      chalk.dim(err.message),
  );
};
