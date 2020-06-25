function ensure<T>(argument: T | undefined | null, message: string): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export default ensure;
