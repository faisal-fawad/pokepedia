import { json, error } from '@sveltejs/kit';
import { api, toUrl } from '$lib/index.js';
import { bfs } from '$lib/functions/bfs.js';

export async function GET({ setHeaders, params }) {
    const res = await fetch(api + 'pokemon-species/' + params.name);
    let data = await res.json();

    // Check if the pokemon is in our list of supported pokemon (i.e. has an image) 
    let url = toUrl(data.id.toString());
    if ((await fetch(url)).status !== 200) {
        console.log('t')
        throw error(404, { message: 'Not found' });
    }

    let cleanData = {};
    cleanData['id'] = data.id.toString();
    cleanData['name'] = data.name;
    cleanData['color'] = data.color.name;
    cleanData['forms'] = [];
    cleanData['versions'] = []
    for (var i in data.varieties) {
        if (data.varieties[i].is_default) {
            let curRes = await fetch(data.varieties[i].pokemon.url);
            let curData = await curRes.json();
            cleanData['image'] = toUrl(data.id.toString());
            cleanData['weight'] = curData.weight;
            cleanData['height'] = curData.height;
            cleanData['types'] = curData.types;
            cleanData['abilities'] = curData.abilities;
            cleanData['moves'] = curData.moves.map(element => {
                const all_versions = [];
                return {
                    name: element.move.name,
                    versions: element.version_group_details.map(version => {
                        if (!cleanData['versions'].includes(version.version_group.name)) cleanData['versions'].push(version.version_group.name);
                        if (!all_versions.includes(version.version_group.name)) all_versions.push(version.version_group.name);
                        return {
                            level: version.level_learned_at,
                            method: version.move_learn_method.name,
                            version: version.version_group.name
                        }
                    }),
                    all_versions
                }
            });
        } else {
            cleanData['forms'].push(data.varieties[i].pokemon.name.replace(data.name + '-', ''));
        }
    }
    const evoRes = await fetch(data.evolution_chain.url);
    cleanData['evolution'] = bfs((await evoRes.json()).chain);

    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return json(cleanData);
}