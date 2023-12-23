import { json } from '@sveltejs/kit';
import { api, toUrl, toId } from '$lib/index.js';

export async function GET({ setHeaders }) {
    const res = await fetch(api + 'pokemon-species?limit=100000');
    let data = (await res.json()).results;
    let invalid = true;
    for (var i = data.length - 1; i >= 0; i--) {
        data[i]['id'] = toId(data[i]['url']);
        let url = toUrl(data[i]['id']);
        // Ensures only pokemon with official artwork are rendered
        if (invalid) {
            let curRes = await fetch(url);
            if (curRes.status === 200) {
                data = data.slice(0, i + 1);
                invalid = false;
            }
        } 
        data[i]['image'] = url;
        data[i]['search'] = `${data[i]['name'].split('-').join(' ').toLowerCase()} ${data[i]['id']}`
    }
    const cache = res.headers.get('cache-control');
    if (cache) setHeaders({ 'cache-control': cache });
    return json(data);
}