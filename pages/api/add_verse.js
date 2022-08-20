import { Redis } from '@upstash/redis'
import { app, database } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore';
              
export default function handler(req, res) {

    const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    
    const data = await redis.get('key');
    
    client.set('foo','bar');
}
  