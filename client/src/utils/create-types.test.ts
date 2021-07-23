import { createTypes, createAsyncTypes } from './create-types';

describe('Create types utility (createTypes)', () => {
  it('should generate an object with action types', () => {
    const types = ['lorem', 'ipsum'];
    const ns = 'namespace';

    expect(createTypes(types, ns)).toEqual({
      lorem: 'namespace.lorem',
      ipsum: 'namespace.ipsum'
    });
  });
});

describe('Create async types utility (createAsyncTypes)', () => {
  it('should generate a list of actions names', () => {
    const action = 'action';

    expect(createAsyncTypes(action)).toEqual([
      'action',
      'actionComplete',
      'actionError'
    ]);
  });
});
