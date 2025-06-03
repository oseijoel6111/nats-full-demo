import {connect, StringCodec} from 'nats'
import dotenv from 'dotenv'
dotenv.config()

const sc = StringCodec()
const nc = await connect({servers: process.env.NATS_URL})

nc.publish("chat.core", sc.encode("Hello from Core Publisher"))
console.log("[Core] Published message");


await nc.drain()