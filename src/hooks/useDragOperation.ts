import { createMemo } from 'solid-js';

import { useDragDropManager } from './useDragDropManager';

export function useDragOperation() {
  const manager = useDragDropManager();

  const source = createMemo(() => manager?.dragOperation.source);
  const target = createMemo(() => manager?.dragOperation.target);

  return {
    get source() {
      return source();
    },
    get target() {
      return target();
    },
  };
}