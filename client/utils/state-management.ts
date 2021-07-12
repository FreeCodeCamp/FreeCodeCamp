export function createTypes(
  types: string[] = [],
  ns = 'annon'
): Record<string, string> {
  return types.reduce(
    (types, action) => ({
      ...types,
      [action]: `${ns}.${action}`
    }),
    {}
  );
}
