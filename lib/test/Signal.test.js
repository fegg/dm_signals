import { Signal } from '../Signal.js';
import { expect } from 'chai';

describe('Signal', () => {
  it('can be constructed', () => {
    const signal = new Signal(1);
    expect(signal.value).equal(1);
  });
  it('can be set', () => {
    const signal = new Signal(1);
    signal.set(2);
    expect(signal.value).equal(2);
  });
  it('can be updated', () => {
    const signal = new Signal(1);
    signal.update((value) => value + 1);
    expect(signal.value).equal(2);
  });
  it('can be subscribed', () => {
    const signal = new Signal(1);
    const target = {};
    signal.subscribe(target);
    expect(signal.value).equal(1);
  });
  it('can be unsubscribed', () => {
    const signal = new Signal(1);
    const target = {};
    signal.subscribe(target);
    signal.unsubscribe(target);
    expect(signal.value).equal(1);
    expect(signal._targets.length).equal(0);
  });
});
