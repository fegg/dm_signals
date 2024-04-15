import { createSignal, computed, effect } from '../index.js';
import { expect } from 'chai';

describe('scene', () => {
  it('createSignal and computed ok', () => {
    const signal = createSignal(1);
    const computedValue = computed(() => {
      return signal.value + 1;
    }, signal);

    expect(signal.value).equal(1);
    expect(computedValue.value).equal(2);

    signal.update((value) => value + 1); // 2

    expect(signal.value).equal(2);
    expect(computedValue.value).equal(3);
  });
  it('effect + computed + signals ok', () => {
    const data = [];

    const signal = createSignal(1);
    const double = computed(() => signal.value * 2, signal);
    const third = computed(() => signal.value * 3, signal);

    effect(() => {
      data.push([double.value, third.value]);
    }, signal);

    signal.update((value) => value + 1); // 2
    expect(data).deep.equal([[4, 6]]);

    signal.update((value) => value + 1); // 3
    expect(data).deep.equal([[4, 6], [6, 9]]);

    signal.set(10);
    expect(data).deep.equal([[4, 6], [6, 9], [20, 30]]);
  });
});
