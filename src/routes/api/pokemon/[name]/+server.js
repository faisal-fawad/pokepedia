import { json, error } from '@sveltejs/kit';
import { api, toUrl } from '$lib/index.js';
import { bfs } from '$lib/functions/bfs.js';
import { redis } from '$lib/server/redis';

export async function GET({ setHeaders, params }) {
    const id = parseInt(params.name)
    if (isNaN(id)) error(404, { message: 'Not found' }); // Only accept IDs

    // Redis implementation
    const cached = await redis?.get(id);
    if (cached) {
        const ttl = await redis.ttl(id);
        setHeaders({ 'cache-control': `max-age=${ttl}` })
        return json(JSON.parse(cached));
    }

    const res = await fetch(api + 'pokemon-species/' + params.name); // Fetch pokemon-species
    if (res.status !== 200) error(404, { message: 'Not found' });
    let data = await res.json();

    // Check if the pokemon is in our list of supported pokemon (i.e. has an image) 
    let url = toUrl(data.id.toString());
    if ((await fetch(url)).status !== 200) error(404, { message: 'Not found' });

    let cleanData = {};
    cleanData['id'] = data.id.toString();
    cleanData['name'] = data.name;
    cleanData['color'] = data.color.name;
    cleanData['forms'] = [];
    cleanData['versions'] = [];
    for (var i in data.varieties) {
        if (data.varieties[i].pokemon.name !== data.name) cleanData['forms'].push(data.varieties[i].pokemon.name.replace(data.name + '-', ''));
        if (data.varieties[i].is_default) {
            let curRes = await fetch(data.varieties[i].pokemon.url); // Fetch pokemon
            let curData = await curRes.json();
            cleanData['image'] = toUrl(data.id.toString());
            cleanData['weight'] = curData.weight;
            cleanData['height'] = curData.height;
            cleanData['types'] = curData.types;
            cleanData['abilities'] = curData.abilities;
            cleanData['moves'] = curData.moves.map(element => {
                const all_versions = element.version_group_details.map(version => version.version_group.name);
                cleanData['versions'].push(...all_versions); // Handle duplicates later to avoid comparisons (more efficient)
                return {
                    name: element.move.name,
                    versions: element.version_group_details.map(version => { 
                        return {
                            level: version.level_learned_at, 
                            version: version.version_group.name 
                        }
                    }),
                    all_versions: all_versions
                }
            });
        }
    }
    cleanData['versions'] = [...new Set(cleanData['versions'])]; // Quickest way to remove duplicate versions

    const evoRes = await fetch(data.evolution_chain.url);
    cleanData['evolution'] = bfs((await evoRes.json()).chain);

    // Redis implementation (a total of 3 API calls are needed to generate this page)
    redis?.set(id, JSON.stringify(cleanData), 'EX', 86400 /* 1 day */);
    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });

    return json(cleanData);
}