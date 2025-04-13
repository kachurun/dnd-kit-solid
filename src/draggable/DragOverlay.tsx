import { Feedback } from '@dnd-kit/dom';
import { createEffect, createMemo, onCleanup, Show , createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { DragDropContext } from '../context/context';
import { useDragDropManager } from '../context/useDragDropManager';
import { wrapSignal } from '../utils/preactSignals';

import type { Draggable, DragDropManager } from '@dnd-kit/dom';
import type { JSX } from 'solid-js';

function noop() {
  return () => {};
}

/**
 * Creates a patched version of the drag-drop manager that prevents
 * draggable/droppable registration within the overlay.
 * This ensures that elements inside the overlay don't interfere with
 * the main drag-drop context.
 */
function usePatchedManager(manager: DragDropManager | null) {
  const patchedManager = createMemo(() => {
    if (!manager) return null;

    // Create a proxy for the registry that prevents registration/unregistration
    const patchedRegistry = new Proxy(manager.registry, {
      get(target, property) {
        if (property === 'register' || property === 'unregister') {
          return noop;
        }
        return target[property as keyof typeof target];
      },
    });

    // Create a proxy for the manager that uses our patched registry
    return new Proxy(manager, {
      get(target, property) {
        if (property === 'registry') {
          return patchedRegistry;
        }
        return target[property as keyof typeof target];
      },
    });
  });
  
  return patchedManager;
}

export interface Props {
  class?: string;
  children: JSX.Element | ((source: Draggable) => JSX.Element);
  style?: JSX.CSSProperties;
  tag?: string;
}

export function DragOverlay(props: Props) {
  const [element, setElement] = createSignal<HTMLDivElement>();
  const manager = useDragDropManager();
  const patchedManager = usePatchedManager(manager);
  const source = wrapSignal(() => manager?.dragOperation?.source);
  
  createEffect(() => {
    if (!source()) {
      setElement(undefined);
    }
  });
    
  createEffect(() => {
    const feedback = manager?.plugins.find(
      (plugin): plugin is Feedback => plugin instanceof Feedback
    );

    if (!feedback) return;

    // TODO element not updating here
    feedback.overlay = element();

    onCleanup(() => {
      feedback.overlay = undefined;
    });
  });

  return (
    <DragDropContext.Provider value={patchedManager()}> 
      <Show when={source()}>
        {(source) => (
          <Dynamic
            component={props.tag || 'div'}
            ref={setElement}
            class={props.class}
            style={props.style}
            data-dnd-overlay
          >
            {typeof props.children === 'function' 
              ? (props.children as (source: Draggable) => JSX.Element)(source())
              : props.children}
          </Dynamic>
        )}
      </Show>
    </DragDropContext.Provider>
  );
}
