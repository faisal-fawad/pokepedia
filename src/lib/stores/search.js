import { writable } from 'svelte/store'

export function createSearchStore(data) {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: ''
    })

    return {
        subscribe,
        set,
        update
    }
}

export function searchHandler(store) {
    const query = store.search.trim().toLowerCase() || '';
    store.filtered = store.data.filter(item => item.search.includes(query));
}