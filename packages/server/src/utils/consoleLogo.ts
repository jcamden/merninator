import chalk from 'chalk';

export default function consoleLogo() {
  console.log(' ');
  console.log(chalk.blue(`                   /// `));
  console.log(chalk.yellow(`           +       `) + chalk.blue(`\\\\\\  `));
  console.log(chalk.yellow(`      +         +   `) + chalk.blue(`||  `));
  console.log(chalk.yellow(`         _-|-_     _//  `));
  console.log(chalk.yellow(`    .-._/     \\___/ / `));
  console.log(chalk.yellow(`    \\ | ` + chalk.blue(`Djinndex`) + ` __/   `));
  console.log(chalk.yellow(`     ~'\\________/    `));
  console.log(chalk.yellow(`         /___\\`));
  console.log(' ');
  console.log(' ');
  return true;
}
