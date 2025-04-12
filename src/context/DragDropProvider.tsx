import { DragDropManager, defaultPreset } from '@dnd-kit/dom';
import { createEffect, createMemo, onCleanup, splitProps } from 'solid-js';

import { DragDropContext } from './context';
import { useRenderer } from '../hooks/useRenderer';

import type { DragDropEvents } from '@dnd-kit/abstract';
import type { DragDropManagerInput, Draggable, Droppable } from '@dnd-kit/dom';
import type { ParentProps } from 'solid-js';

type Events = DragDropEvents<Draggable, Droppable, DragDropManager>;

export interface Props extends DragDropManagerInput, ParentProps {
  manager?: DragDropManager;
  onBeforeDragStart?: Events['beforedragstart'];
  onCollision?: Events['collision'];
  onDragStart?: Events['dragstart'];
  onDragMove?: Events['dragmove'];
  onDragOver?: Events['dragover'];
  onDragEnd?: Events['dragend'];
}

export function DragDropProvider(props: Props) {
  const [local, input] = splitProps(props, [
    'children',
    'manager',
    'onCollision',
    'onBeforeDragStart',
    'onDragStart',
    'onDragMove',
    'onDragOver',
    'onDragEnd',
  ]);

  const { renderer, trackRendering } = useRenderer();
  const manager = createMemo(() => local.manager ?? new DragDropManager(input));
  
  createEffect(() => {
    manager().renderer = renderer();
    
    manager().monitor.addEventListener('beforedragstart', (event, manager) => {
      const callback = local.onBeforeDragStart;

      if (callback) {
        trackRendering(() => callback(event, manager));
      }
    });
    
    manager().monitor.addEventListener('dragstart', (event, manager) =>
      local.onDragStart?.(event, manager)
    );
    
    manager().monitor.addEventListener('dragover', (event, manager) => {
      const callback = local.onDragOver;

      if (callback) {
        trackRendering(() => callback(event, manager));
      }
    });
    
    manager().monitor.addEventListener('dragmove', (event, manager) => {
      const callback = local.onDragMove;

      if (callback) {
        trackRendering(() => callback(event, manager));
      }
    });
    
    manager().monitor.addEventListener('dragend', (event, manager) => {
      const callback = local.onDragEnd;

      if (callback) {
        trackRendering(() => callback(event, manager));
      }
    });
    
    manager().monitor.addEventListener('collision', (event, manager) =>
      local.onCollision?.(event, manager)
    );
    
    onCleanup(() => {
      manager().destroy();
    });
  });
  
  createEffect(() => {
    if (!manager()) {
      return;
    }

    manager().plugins = input.plugins ?? defaultPreset.plugins;
    manager().sensors = input.sensors ?? defaultPreset.sensors;
    manager().modifiers = input.modifiers ?? defaultPreset.modifiers;
  });

  return (
    /* eslint-disable-next-line solid/reactivity */
    <DragDropContext.Provider value={manager()}>
      {local.children}
    </DragDropContext.Provider>
  );
}
