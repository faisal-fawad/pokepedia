import { Redis } from 'ioredis';
import { REDIS_URI } from '$env/static/private';

let r;
if (REDIS_URI) r = new Redis(REDIS_URI);
export const redis = r;