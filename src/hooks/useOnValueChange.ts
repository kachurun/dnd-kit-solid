import { createEffect, type Accessor } from 'solid-js';

export function useOnValueChange<T>(
  value: Accessor<T>,
  onChange: (value: T, oldValue: T) => void,
  compare: (a: T, b: T) => boolean = Object.is
) {
  let previous = value();

  createEffect(() => {
    const current = value();
    if (!compare(current, previous)) {
      const old = previous;
      previous = current;
      onChange(current, old);
    }
  });
}