const isType = (type: string) => (value: any) => typeof value === type;
export const isString = isType("string");
export const isNull = (value: any) => value === null;
