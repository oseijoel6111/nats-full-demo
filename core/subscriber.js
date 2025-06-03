import {connect} from 'nats'
import dotEnv from 'dotenv'
dotEnv.config()

const nc = await connect({servers: process.env.NATS_URL})
console.log("[Core] Subscribed to chat.core");

const sub = nc.subscribe("chat.core")
for await(const m of sub){
    console.log(`[Core] Received: ${m.string()}`);
}