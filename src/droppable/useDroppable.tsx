import { Droppable, type DroppableInput, DragDropManager } from '@dnd-kit/dom';
import { createEffect, createSignal } from 'solid-js';

import { useDragDropManager } from '../context/useDragDropManager';

import type { Data } from '@dnd-kit/abstract';

export interface UseDroppableInput<T extends Data = Data> extends DroppableInput<T> {
  manager?: DragDropManager;
}

export function useDroppable<T extends Data = Data>(
  input: UseDroppableInput<T>
) {
  const [elementRef, setElementRef] = createSignal<Element | undefined>(input.element);

  const manager = input.manager ?? useDragDropManager() ?? new DragDropManager();
  const droppable = new Droppable({
    ...input,
  }, manager);

  createEffect(() => {
    if (elementRef()) {
      droppable.element = elementRef();
    }
    
    droppable.id = input.id;
    droppable.disabled = input.disabled ?? false;
    droppable.accept = input.accept;
    droppable.type = input.type;

    droppable.collisionPriority = input.collisionPriority;
    
    if (input.collisionDetector) {
      droppable.collisionDetector = input.collisionDetector;
    }
    
    if (input.data) {
      droppable.data = input.data;
    }
  });

  return {
    droppable,
    isDropTarget: () => droppable.isDropTarget,
    ref: setElementRef,
  };
}