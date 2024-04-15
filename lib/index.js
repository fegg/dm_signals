import { Signal } from './Signal.js';
import { Computed } from './Computed.js';

export function createSignal(value) {
  return new Signal(value);
}

export function computed(receiver, ...signals) {
  return new Computed(receiver, ...signals);
}

export function effect(fn, ...signals) {
  const target = {
    notify() {
      fn();
    },
  };

  signals.forEach((s) => s.subscribe(target));
}
