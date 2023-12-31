import { json } from '@sveltejs/kit';
import { api, toUrl, toId } from '$lib/index.js';
import { redis } from '$lib/server/redis.js';

export async function GET({ setHeaders }) {
    const id = 0;

    // Redis implementation
    const cached = await redis.get(id);
    if (cached) {
        const ttl = await redis.ttl(id);
        setHeaders({ 'cache-control': `max-age=${ttl}` })
        return json(JSON.parse(cached));
    }

    const res = await fetch(api + 'pokemon-species?limit=100000');
    let data = (await res.json()).results;
    for (const i in data) {
        data[i]['id'] = toId(data[i]['url']);
        data[i]['image'] = toUrl(data[i]['id']);
        data[i]['search'] = `${data[i]['name'].split('-').join(' ').toLowerCase()} ${data[i]['id']}`
    }

    // Redis implementation
    redis.set(id, JSON.stringify(data), 'EX', 86400 /* 1 day */);
    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return json(data);
}