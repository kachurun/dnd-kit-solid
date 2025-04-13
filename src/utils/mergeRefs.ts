type Ref<T> = ((el: T) => void);

export function mergeRefs<T extends Element>(...refs: Array<Ref<T> | undefined>): (el: T) => void {
  return (el: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(el);
      } 
    }
  };
} 