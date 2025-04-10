import { useContext } from 'solid-js';

import { DragDropContext } from '../context/context';

export function useDragDropManager() {
  return useContext(DragDropContext);
}