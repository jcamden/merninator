export async function login({ username, password }: { username: string; password: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'John' && password === '123456') {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
