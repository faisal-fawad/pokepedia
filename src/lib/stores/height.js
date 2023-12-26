import { writable } from 'svelte/store';

export const height = writable(0);

export function observeHeight(el, store) {
    const observer = new ResizeObserver(e => {
        store.set(e[0].contentRect.height);
    })
    if (el) observer.observe(el);
}