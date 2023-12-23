import { toId, toUrl } from '$lib/index.js'

// Breadth-first search on the evolution chain of a pokemon to build a cleaner representation of data
export function bfs(root) {
    let curQueue = [root];
    let nextQueue = [];
    const result = [];

    do {
        let curResult = [];
        for (const i in curQueue) {
            curResult.push({
                name: curQueue[i].species.name,
                id: toId(curQueue[i].species.url),
                image: toUrl(toId(curQueue[i].species.url))
            });
            if (curQueue[i].evolves_to !== 0) {
                nextQueue.push(...curQueue[i].evolves_to);
            }
        }
        curQueue = nextQueue;
        nextQueue = [];
        result.push(curResult);
    } while (curQueue.length !== 0);
    return result;
}