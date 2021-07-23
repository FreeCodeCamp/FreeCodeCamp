type CreateTypesType = {
  [action: string]: string;
};

/**
 * Creates an object in which the `keys` represent the action names and the
 * `values` the action type.
 * {
 *   action: actionType,
 *   ...
 * }
 * @param {array} types Names of the actions.
 * @param {string} ns Name of the namespace.
 * @returns {object} Object with action types.
 */
export function createTypes(types: string[], ns: string): CreateTypesType {
  return types.reduce(
    (types, action: string) => ({
      ...types,
      [action]: `${ns}.${action}`
    }),
    {}
  );
}

/**
 * Creates an array with action names.
 * - original
 * - complete
 * - error
 * @param {string} action The name of the action.
 * @returns {array} Names of action names.
 */
export const createAsyncTypes = (action: string): string[] => [
  `${action}`,
  `${action}Complete`,
  `${action}Error`
];
