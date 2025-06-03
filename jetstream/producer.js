import { connect, StringCodec } from "nats";
import dotenv from "dotenv";
dotenv.config();

const sc = StringCodec();
const nc = await connect({ servers: process.env.NATS_URL });
const js = nc.jetstream();

await js.publish("events.user.updated", sc.encode("User updated persistently"));
console.log("[JetStream] Event published");

await nc.close();
