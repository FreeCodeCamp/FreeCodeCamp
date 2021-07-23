import borderColorPicker from './border-color-picker';

describe('Border color picker helper', () => {
  it('should get color for non donators and non top contributors', () => {
    expect(borderColorPicker(false, false)).toEqual('default-border');
  });

  it('should get color for donators and top contributors', () => {
    expect(borderColorPicker(true, true)).toEqual('purple-border');
  });

  it('should get color for only donators', () => {
    expect(borderColorPicker(true, false)).toEqual('gold-border');
  });

  it('should get color for only top contributors', () => {
    expect(borderColorPicker(false, true)).toEqual('blue-border');
  });
});
