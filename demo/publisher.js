// publisher.js
import { connect, StringCodec } from 'nats';
import dotEnv from 'dotenv';
dotEnv.config();

const SUBJECT = 'fieldtool.item.created'; // You can change to fieldtool.update, fieldtool.delete, etc.
const sc = StringCodec();

async function publishMessage() {
    const nc = await connect({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
    console.log(`Connected to NATS server at ${nc.getServer()}`);

    const message = {
        action: 'create.zxy', // Change to 'update' or 'delete' as needed
        data: {
            id: 1,
            name: 'Test Resource',
        }
    };

    const encoded = sc.encode(JSON.stringify(message));
    nc.publish(SUBJECT, encoded);
    console.log(`Message published to subject "${SUBJECT}":`, message);

    await nc.drain(); // Gracefully close the connection
}

publishMessage()
    .then(() => console.log('Message sent successfully'))
    .catch(err => console.error('Error publishing message:', err));
