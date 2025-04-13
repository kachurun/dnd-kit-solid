import type { JSX, ParentProps } from 'solid-js';

export type WithAttributes<Props extends object, Element extends HTMLElement = HTMLElement> 
    = Omit<JSX.BaseHTMLAttributes<Element>, keyof Props> 
    & ParentProps<Props> & {
      ref?: (el: Element) => void;
    };