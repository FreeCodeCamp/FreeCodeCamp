export function createTypes(types = [], ns = 'annon') {
  return types.reduce(
    (types, action) => ({
      ...types,
      [action]: `${ns}.${action}`
    }),
    {}
  );
}
