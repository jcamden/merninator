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

export function ensure<T>(argument: T | undefined | null, message: string): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
