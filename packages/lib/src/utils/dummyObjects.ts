export const user = {
  self: '/user/monkey',
  email: 'monkey@monkeybusiness.com',
  givenName: 'Monkey',
  familyName: 'Monkeys',
  _v: 1,
};

export const voidMaker = (params: any): void => {
  console.log(params);
};

export const voidPromiseMaker = (params: any): Promise<void> => {
  return new Promise((res, rej) => {
    console.log(params);
  });
};
