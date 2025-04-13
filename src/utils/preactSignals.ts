import { effect } from '@dnd-kit/state';
import { createSignal, type Accessor, onCleanup, createEffect } from 'solid-js';

type SignalLike<T> = (() => T) | { value: T };

/**
 * Wraps a Preact signal into a Solid.js signal.
 * 
 * This function converts various Preact signal types into a Solid.js signal:
 * - Function signals (() => T)
 * - Object signals with value property ({ value: T })
 * - Direct values (T)
 * 
 * The returned Solid.js signal will automatically update when the Preact signal changes,
 * and properly clean up its effect when no longer needed.
 * 
 * @template T - The type of the signal value
 * @param signal - The Preact signal to wrap
 * @returns A Solid.js signal accessor function that returns the current value
 * 
 * @example
 * ```ts
 * // Function signal
 * const preactSignal = signal(42); // or () => signal.value
 * const solidSignal = wrapSignal(preactSignal);
 * 
 * // Object signal
 * const preactSignal = { value: 42 };
 * const solidSignal = wrapSignal(preactSignal);
 * 
 * // Direct value
 * const solidSignal = wrapSignal(42);
 * ```
 */
export function wrapSignal<T>(signal: SignalLike<T>): Accessor<T> {
  const read = () => {
    if (typeof signal === 'function') {
      return signal();
    }

    if (signal && typeof signal === 'object' && 'value' in signal) {
      return signal.value;
    }
    
    return signal;
  };
  
  const [get, set] = createSignal<T>(read());
  
  const dispose = effect(() => {
    const value = read();
    set(() => value);
  });

  onCleanup(() => {
    dispose();
  });

  return get;
}

/**
 * Creates an effect that works with both Solid.js and Preact signals
 * @param fn The effect function that can access both Solid and Preact signals
 */
export function createPreactEffect(fn: () => void): void {
  createEffect(() => {
    const dispose = effect(fn);
    onCleanup(() => dispose());
  });
}