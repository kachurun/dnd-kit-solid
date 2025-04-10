import { Draggable, DragDropManager } from '@dnd-kit/dom';

import styles from './DraggableDemo.module.css';
import { DragDropProvider } from '../../src/context/DragDropProvider';

export function DraggableDemo() {
  const manager = new DragDropManager();
  const draggable = new Draggable({ id: 'draggable-1' }, manager);

  return (
    <DragDropProvider manager={manager}>
      <div class={styles.container}>
        <button ref={el => draggable.element = el} class={styles.btn}>draggable</button>
      </div>
    </DragDropProvider>
  );
} 