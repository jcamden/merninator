import chalk from 'chalk';

const consoleLogo = (): void => {
    console.log(' ');
    console.log(chalk.blue(`                   /// `));
    console.log(chalk.yellow(`           +       `) + chalk.blue(`\\\\\\  `));
    console.log(chalk.yellow(`      +         +   `) + chalk.blue(`||  `));
    console.log(chalk.yellow(`         _-|-_     _` + chalk.blue(`//  `)));
    console.log(chalk.yellow(`    .-._/     \\___/ / `));
    console.log(chalk.yellow(`    \\ | ` + chalk.blue(`Djinndex`) + ` __/   `));
    console.log(chalk.yellow(`     ~'\\________/    `));
    console.log(chalk.yellow(`         /___\\`));
    console.log(' ');
    console.log(' ');
};

export default consoleLogo;
