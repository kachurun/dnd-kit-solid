import { DragDropManager } from '@dnd-kit/dom';
import { Sortable, type SortableInput } from '@dnd-kit/dom/sortable';
import { createEffect, createSignal } from 'solid-js';

import { useDragDropManager } from '../context/useDragDropManager';

import type { Data } from '@dnd-kit/abstract';

export interface UseSortableInput<T extends Data = Data> extends Omit<SortableInput<T>, 'source'> {
  manager?: DragDropManager;
  source?: Element;
}

export function useSortable<T extends Data = Data>(
  input: UseSortableInput<T>
) {
  const [elementRef, setElementRef] = createSignal<Element | undefined>(input.element);
  const [handleRef, setHandleRef] = createSignal<Element | undefined>(input.handle);
  const [targetRef, setTargetRef] = createSignal<Element | undefined>(input.target);
  const [sourceRef, setSourceRef] = createSignal<Element | undefined>(input.source);

  const manager = input.manager ?? useDragDropManager() ?? new DragDropManager();
  const sortable = new Sortable({
    ...input,
    transition: input.transition ?? null,
  }, manager);

  createEffect(() => {
    if (handleRef()) {
      sortable.handle = handleRef();
    }
    
    if (elementRef()) {
      sortable.element = elementRef();
    }

    if (targetRef()) {
      sortable.target = targetRef();
    }

    if (sourceRef()) {
      sortable.source = sourceRef();
    }
    
    sortable.id = input.id;
    sortable.disabled = input.disabled ?? false;
    sortable.feedback = input.feedback ?? 'default';
    sortable.alignment = input.alignment;
    sortable.modifiers = input.modifiers;
    sortable.sensors = input.sensors;
    sortable.accept = input.accept;
    sortable.type = input.type;
    sortable.group = input.group;
    sortable.index = input.index;
    sortable.collisionPriority = input.collisionPriority;
    sortable.transition = input.transition ?? null;
    
    if (input.collisionDetector) {
      sortable.collisionDetector = input.collisionDetector;
    }
    
    if (input.data) {
      sortable.data = input.data;
    }
  });

  return {
    sortable,
    isDragging: () => sortable.isDragging,
    isDropping: () => sortable.isDropping,
    isDragSource: () => sortable.isDragSource,
    isDropTarget: () => sortable.isDropTarget,
    
    ref: setElementRef,
    targetRef: setTargetRef,
    sourceRef: setSourceRef,
    handleRef: setHandleRef,
  };
}