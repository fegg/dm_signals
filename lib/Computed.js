import { Signal } from './Signal.js';

export class Computed extends Signal {
  constructor(receiver, ...signals) {
    const sourceValue = receiver();
    super(sourceValue);

    this._receiver = receiver;
    this._value = sourceValue;
    this._targets = [];

    signals.forEach((s) => s.subscribe(this));
  }

  notify(target) {
    this._value = this._receiver(target.value);
    super.publish();
  }
}
