import { error } from '@sveltejs/kit';

export async function load({ params, fetch, setHeaders }) {
    const res = await fetch('api/pokemon/' + params.name);
    if (res.status !== 200) throw error(404, 'Pokémon not found');
    const pokemon = await res.json();
    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return {
        pokemon
    }
}