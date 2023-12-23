import { writable } from 'svelte/store';

export function createMoveStore(data, version) {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: filterHandler({ data, version }),
        version: version
    })

    return {
        subscribe,
        set,
        update
    }
}

export function filterHandler(store) {
    let filtered = store.data.filter(move => move.all_versions.includes(store.version));
    filtered = filtered.map(move => {
        let details = move.versions.find(ele => ele.version === store.version); // Should always return one
        return {
            ...details,
            name: move.name,
        }
    })
    store.filtered = filtered.sort((a, b) => {
        if (a.level === 0) return 1;
        if (b.level === 0) return -1;
        return a.level - b.level
    })
    return store.filtered;
}