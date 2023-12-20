import { json, error } from '@sveltejs/kit';
import { api, toUrl } from '$lib/index.js';

export async function GET({ setHeaders, params }) {
    const res = await fetch(api + 'pokemon-species/' + params.name);
    let data = await res.json();

    // Check if the pokemon is in our list of supported pokemon (i.e. has an image) 
    let url = toUrl(data.id.toString());
    if ((await fetch(url)).status !== 200) throw error(404, { message: 'Not found' });

    let cleanData = {};
    cleanData['id'] = data.id.toString();
    cleanData['name'] = data.name;
    cleanData['color'] = data.color.name;
    cleanData['forms'] = [];
    for (var i in data.varieties) {
        if (data.varieties[i].is_default) {
            let curRes = await fetch(data.varieties[i].pokemon.url);
            let curData = await curRes.json();
            cleanData['image'] = toUrl(data.id.toString());
            cleanData['weight'] = curData.weight;
            cleanData['height'] = curData.height;
            cleanData['types'] = curData.types;
            cleanData['abilities'] = curData.abilities;
            cleanData['moves'] = curData.moves;
        } else {
            cleanData['forms'].push(data.varieties[i].pokemon.name.replace(data.name + '-', ''));
        }
    }
    const evoRes = await fetch(data.evolution_chain.url);
    cleanData['evolution'] = (await evoRes.json()).chain;

    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return json(cleanData);
}