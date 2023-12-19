import { api } from '$lib/index.js';

export async function load({ params, fetch, setHeaders }) {
    const res = await fetch(api + 'pokemon/' + params.name);
    const entry = await res.json();
    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return {
        entry
    }
}