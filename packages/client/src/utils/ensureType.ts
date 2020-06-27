function ensureType<ToCheck, ExpectedType>(toCheck: ToCheck | undefined | null, expectedType?: ExpectedType): ToCheck {
  if (toCheck === undefined || toCheck === null) {
    throw new TypeError('ENSURE FAILED: object to check was undefined');
  } else if (typeof toCheck !== typeof expectedType) {
    throw new TypeError(`ENSURE FAILED: ${typeof toCheck} !== ${typeof expectedType}`);
  } else {
    return toCheck;
  }
}

export default ensureType;
