import { override, addBabelPlugins } from 'customize-cra';

module.exports = override(
  addBabelPlugins('babel-plugin-typescript-to-proptypes', '@babel/plugin-proposal-class-properties'),
);
