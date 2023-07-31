export function convertToString(obj: object) {
  const keys = Object.keys(obj);
  //@ts-ignore
  const array = keys.map((key) => obj[key]);

  let convertedToString = array.join("");

  return convertedToString;
}
