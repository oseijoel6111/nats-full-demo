import { connect, StringCodec } from "nats";
import dotenv from "dotenv";
dotenv.config();

const sc = StringCodec();
const nc = await connect({ servers: process.env.NATS_URL });
const js = nc.jetstream();

const sub = await js.subscribe("events.user.updated", {
  durable: "MOBILE",
  manualAck: true
});

console.log("[JetStream] Durable subscriber listening...");

for await (const msg of sub) {
  console.log(`[JetStream] Received: ${sc.decode(msg.data)}`);
  msg.ack();
}
