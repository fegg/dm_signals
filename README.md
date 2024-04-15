## 说明

一个简单的 Signals 库，并没有编译到 ES5，不能用于生产。

没有处理自动依赖的情况，所以 `computed` 和 `effect` 需要手动传入上下文。

## API

### createSignal

```javascript
const signal = createSignal(0);
// 基础的读和写
signal.set(1);
signal.update(10);
```

### computed

```javascript
const signal = createSignal(0);

const computedValue = computed(() => {
  return signal.value + 1;
}, signal);

signal.update((oldValue) => oldValue + 1);

// computedValue -> 2
```

### effect

```javascript
const signal = createSignal(0);

effect(() => {
  console.log(signal.value);
});

signal.update((oldValue) => oldValue + 1);

signal.set(10);
```
