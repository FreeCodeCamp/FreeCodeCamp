import {
  wrapHandledError,
  unwrapHandledError
} from '../../utils/handled-error';

describe('handled-error integration', () => {
  const handledA = {
    type: 'info',
    message: 'something helpful',
    redirectTo: '/a-path-we-choose'
  };
  const handledB = {
    type: 'danger',
    message: 'Oh noes!',
    redirectTo: '/whoops'
  };
  const handledC = {
    type: 'success',
    message: 'great news!',
    redirectTo: '/awesome'
  };
  const handledD = {};

  it('can wrap and unwrap handled errors', () => {
    expect.assertions(4);
    const wrappedA = wrapHandledError(new Error(), handledA);
    const wrappedB = wrapHandledError(new Error(), handledB);
    const wrappedC = wrapHandledError(new Error(), handledC);
    const wrappedD = wrapHandledError(new Error(), handledD);

    const unwrappedA = unwrapHandledError(wrappedA);
    const unwrappedB = unwrapHandledError(wrappedB);
    const unwrappedC = unwrapHandledError(wrappedC);
    const unwrappedD = unwrapHandledError(wrappedD);

    expect(unwrappedA).toEqual(handledA);
    expect(unwrappedB).toEqual(handledB);
    expect(unwrappedC).toEqual(handledC);
    expect(unwrappedD).toEqual(handledD);
  });
});
