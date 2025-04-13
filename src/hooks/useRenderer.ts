import { createSignal, batch, createEffect, on } from 'solid-js';

import type { DragDropManager } from '@dnd-kit/dom';

type Renderer = DragDropManager['renderer'];

export function useRenderer(): { renderer: Renderer; trackRendering: (callback: () => void) => void } {
  const [transitionCount, setTransitionCount] = createSignal(0);
  const [rendering, setRendering] = createSignal<Promise<void>>(Promise.resolve());
  let resolver: (() => void) | null = null;

  // Resolve rendering promise when transitionCount changes
  createEffect(on(transitionCount, () => {
    resolver?.();
    void setRendering(Promise.resolve());
  }));

  const renderer = {
    get rendering() {
      return rendering();
    },
  };

  function trackRendering(callback: () => void) {
    if (rendering() === Promise.resolve()) {
      const newRendering = new Promise<void>((resolve) => {
        resolver = resolve;
      });
      void setRendering(newRendering);
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
