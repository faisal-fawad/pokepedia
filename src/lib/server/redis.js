import { Redis } from 'ioredis';
import { REDIS_URI } from '$env/static/private';

let r;
if (REDIS_URI) {
    try {
        r = new Redis(REDIS_URI);
        const info = await r.info();
        console.log("Connected to Redis successfully");
    } catch (e) {
        r.disconnect();
        r = null;
        console.log("Failed to connect to Redis");
    }
}
export const redis = r;