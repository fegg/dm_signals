export class Signal {
  constructor(sourceValue) {
    this._value = sourceValue;

    /**
     * @type {WeakRef[]}
     */
    this._targets = [];
  }

  get value() {
    return this._value;
  }

  set(value) {
    this._value = value;
    this.publish();
  }

  update(fn) {
    this._value = fn(this._value);
    this.publish();
  }

  subscribe(target) {
    this._targets.push(new WeakRef(target));
  }

  /**
   * @param {WeakRef} target
   */
  unsubscribe(target) {
    if (!target) {
      throw new Error('unsubscribe target cannot be null or undefined');
    }

    const index = this._targets.findIndex((t) => t.deref() === target);
    if (index > -1) {
      this._targets.splice(index, 1);
    }
  }

  notify(target) {
    throw new Error('Not implemented');
  }

  publish() {
    const removed = [];

    this._targets.forEach((t) => {
      const target = t.deref();

      if (!target) {
        removed.push(t);
      } else {
        target.notify(this);
      }
    });

    for (let i = 0; i < removed.length; i++) {
      this._targets.splice(i, 1);
    }
  }
}
