import { DragDropManager, Draggable, type DraggableInput } from '@dnd-kit/dom';
import { createEffect, createSignal } from 'solid-js';

import { useDragDropManager } from '../context/useDragDropManager';

import type { Data } from '@dnd-kit/abstract';

export interface UseDraggableInput<T extends Data = Data> extends DraggableInput<T> {
  manager?: DragDropManager;
}
  
export function useDraggable<T extends Data = Data>(
  input: UseDraggableInput<T>
) {
  const [elementRef, setElementRef] = createSignal<Element | undefined>(input.element);
  const [handleRef, setHandleRef] = createSignal<Element | undefined>(input.handle);

  const manager = input.manager ?? useDragDropManager() ?? new DragDropManager();
  const draggable = new Draggable({
    ...input,
  }, manager);

  createEffect(() => {
    if (handleRef()) {
      draggable.handle = handleRef();
    }
    
    if (elementRef()) {
      draggable.element = elementRef();
    }
    
    draggable.id = input.id;
    draggable.disabled = input.disabled ?? false;
    draggable.feedback = input.feedback ?? 'default';
    draggable.alignment = input.alignment;
    draggable.modifiers = input.modifiers;
    draggable.sensors = input.sensors;
    
    if (input.data) {
      draggable.data = input.data;
    }
  });

  return {
    draggable,

    isDragging: () => draggable.isDragging,
    isDropping: () => draggable.isDropping,
    isDragSource: () => draggable.isDragSource,
    
    handleRef: setHandleRef,
    ref: setElementRef,
  };
}