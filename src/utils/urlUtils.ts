export function stringifyQueryParams(
  obj = {} as any,
  encodeFn = encodeURIComponent
): string {
  if (!Object.keys(obj).length) return "";

  return `?${Object.keys(obj)
    .filter(key => !!obj[key])
    .map(key => {
      const value = obj[key];
      return Array.isArray(value)
        ? value.map(val => `${key}=${encodeFn(val)}`).join("&")
        : `${key}=${encodeFn(obj[key])}`;
    })
    .join("&")}`;
}
