import { useContext } from 'solid-js';

import { DragDropContext } from './context';

export function useDragDropManager() {
  return useContext(DragDropContext);
}