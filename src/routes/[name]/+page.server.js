export async function load({ params, fetch, setHeaders }) {
    const res = await fetch('api/pokemon/' + params.name);
    const pokemon = await res.json();
    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return {
        pokemon
    }
}