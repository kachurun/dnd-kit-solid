import { createEffect, createUniqueId, mergeProps, splitProps, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { useDraggable, type UseDraggableInput } from './useDraggable';

import type { WithAttributes } from '../utils/types';

type CommonProps = Omit<UseDraggableInput, 'id'> & {
  id?: string;
};

type DraggablePropsAsFunction = CommonProps & {
  children: (draggable: ReturnType<typeof useDraggable>) => JSX.Element;
};

type DraggablePropsAsAttributes = WithAttributes<CommonProps> & {
  tag?: string;
};

export type DraggableProps = DraggablePropsAsFunction | DraggablePropsAsAttributes;

export function Draggable(props: DraggableProps) {
  const local = mergeProps({
    id: createUniqueId(),
  }, props);

  const [draggableProps, attrs] = splitProps(local, [
    'id',
    'type',
    'disabled',
    'data',
    'handle',
    'feedback',
    'alignment',
    'modifiers',
    'sensors',
    'manager',
  ]);

  const draggable = useDraggable(draggableProps);

  createEffect(() => {
    console.log(draggableProps);
  });

  return (<>
    {
      typeof props.children === 'function' ? (
        props.children(draggable)
      ) : (
        <Dynamic
          component={(props as DraggablePropsAsAttributes).tag || 'div'}
          ref={draggable.ref}
          {...attrs}
        >
          {props.children}
        </Dynamic>
      )
    }
  </>);
}