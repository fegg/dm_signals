import { Computed } from '../Computed.js';
import { expect } from 'chai';
import { createSignal } from '../index.js';

describe('Computed', () => {
  it('computed 基础功能', () => {
    const signal = createSignal(0);

    const computedValue = new Computed(() => {
      return signal.value + 1;
    }, signal);

    expect(computedValue.value).equal(1);

    signal.update((oldValue) => oldValue + 1);

    expect(computedValue.value).equal(2);
  });
});
