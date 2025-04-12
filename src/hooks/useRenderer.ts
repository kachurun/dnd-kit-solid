import { createSignal, batch, type Accessor, createMemo, createEffect, on } from 'solid-js';

import type { DragDropManager } from '@dnd-kit/dom';

type Renderer = DragDropManager['renderer'];

export function useRenderer(): { renderer: Accessor<Renderer>; trackRendering: (callback: () => void) => void } {
  const [transitionCount, setTransitionCount] = createSignal(0);

  let rendering: Promise<void> | null = null;
  let resolver: (() => void) | null = null;

  // Resolve rendering promise when transitionCount changes
  createEffect(on(transitionCount, () => {
    resolver?.();
    rendering = null;
  }));

  const renderer = createMemo<Renderer>(() => ({
      rendering: rendering ?? Promise.resolve()
  }));

  function trackRendering(callback: () => void) {
    if (!rendering) {
      rendering = new Promise<void>((resolve) => {
        resolver = resolve;
      });
    }

    batch(() => {
      callback();
      setTransitionCount(c => c + 1);
    });
  }

  return {
    renderer,
    trackRendering,
  };
}
