import { writable } from 'svelte/store';

// Signature of height store
export const height = writable(0);

export function observeHeight(el, store) {
    const observer = new ResizeObserver(e => {
        store.set(e[0].borderBoxSize[0].blockSize);
    })
    if (el) observer.observe(el);
}