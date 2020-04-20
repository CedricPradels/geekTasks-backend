const isType = (type: string) => (value: any) => typeof value === type;
export const isString = isType("string");
export const isNull = (value: any) => value === null;

export const isPassword = (password: any) => {
  if (!isString(password)) return false;
  if (password.length < 6) return false;
  if (!/^[A-z0-9]+$/.test(password)) return false;
  return true;
};

export const isEmail = (email: any) => {
  if (!isString(email)) return false;
  return true;
};

export const isUsername = (username: any) => {
  if (!isString(username)) return false;
  if (username.length < 2) return false;
  return true;
};
