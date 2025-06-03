import { connect } from "nats";
import dotenv from "dotenv";
dotenv.config();

const nc = await connect({ servers: process.env.NATS_URL });
const jsm = await nc.jetstreamManager();

await jsm.streams.add({
  name: "USER_EVENTS",
  subjects: ["events.*"]
});

console.log("✅ JetStream stream 'USER_EVENTS' created");
await nc.close();
