import { DragDropManager, Draggable, Droppable, KeyboardSensor, PointerSensor } from '@dnd-kit/dom';
import { createSignal, For } from 'solid-js';

import styles from './DraggableDemo.module.css';
import { DragDropProvider } from '../../src/context/DragDropProvider';

export function ComplexDragDropDemo() {
  const [activeId, setActiveId] = createSignal<string | null>(null);
  const [overId, setOverId] = createSignal<string | null>(null);

  const manager = new DragDropManager({
    sensors: [
      PointerSensor,  // Handles mouse and touch
      KeyboardSensor, // Enables keyboard navigation
    ],
  });

  const draggables = [
    new Draggable({ id: 'draggable-1' }, manager),
    new Draggable({ id: 'draggable-2' }, manager),
  ];

  const droppables = [
    new Droppable({ id: 'droppable-1' }, manager),
    new Droppable({ id: 'droppable-2' }, manager),
  ];

  return (
    <DragDropProvider
      manager={manager}
      onBeforeDragStart={(event) => {
        console.warn('beforeDragStart', event);
        if (event.operation?.source?.id) {
          setActiveId(String(event.operation.source.id));
        }
      }}
      onDragStart={(event) => {
        console.warn('dragStart', event);
      }}
      onDragMove={(event) => {
        console.warn('dragMove', event);
      }}
      onDragOver={(event) => {
        console.warn('dragOver', event);
        if (event.operation?.target?.id) {
          setOverId(String(event.operation.target.id));
        }
      }}
      onDragEnd={(event) => {
        console.warn('dragEnd', event);
        setActiveId(null);
        setOverId(null);
      }}
      onCollision={(event) => {
        console.warn('collision', event);
      }}
    >
      <div class={styles.container}>
        <div class={styles.draggableContainer}>
          <For each={draggables}>
            {(draggable) => (
              <button
                ref={el => draggable.element = el}
                class={styles.btn}
                classList={{
                  [styles.active]: activeId() === draggable.id,
                  [styles.over]: overId() === draggable.id,
                }}
              >
                Draggable {draggable.id}
              </button>
            )}
          </For>
        </div>

        <div class={styles.droppableContainer}>
          <For each={droppables}>
            {(droppable) => (
              <div
                ref={el => droppable.element = el}
                class={styles.droppable}
                classList={{
                  [styles.active]: activeId() === droppable.id,
                  [styles.over]: overId() === droppable.id,
                }}
              >
                Droppable {droppable.id}
              </div>
            )}
          </For>
        </div>
      </div>
    </DragDropProvider>
  );
} 