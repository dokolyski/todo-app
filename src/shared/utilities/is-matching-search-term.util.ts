type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export function isMatchingSearchTerm<T>(requiredSearchTerms: string[], object: T, keysToCheck: StringKeys<T>[]): boolean {
  requiredSearchTerms = [...requiredSearchTerms].map(term => term.toLowerCase());
  const valuesToCheck = keysToCheck.map(key => (object[key] as string).toLowerCase());
  return requiredSearchTerms.every(searchTerm => valuesToCheck.some(value => value.match(searchTerm)));
}
