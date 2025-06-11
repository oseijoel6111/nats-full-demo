import { connect, StringCodec } from 'nats'
import dotEnv from 'dotenv'
dotEnv.config()
import { handleMessage } from './dispatcher.js'

const SUBJECT = 'fieldtool.>'
const sc = StringCodec()

async function initNatsSubcriber() {
    const nc = await connect({ servers: process.env.NATS_URL || 'nats://localhost:4222' })
    console.log(`Connected to NATS server at ${nc.getServer()}`)

    const sub = nc.subscribe(SUBJECT)
    console.log(`Subscribed to subject: ${SUBJECT}`)
    console.log(sub);

    for await (const msg of sub) {
        try {
            console.log(`Received message on subject ${msg.subject}:`, sc.decode(msg.data))
            const decoded = sc.decode(msg.data)
            console.log(`Decoded message:`, decoded)
            const data = JSON.parse(decoded)
            console.log(`Parsed JSON data:`, data)
            // Here you would typically call a function to handle the message
            await handleMessage(msg.subject, data)
            console.log(`Message processed successfully for subject: ${msg.subject}`)
        } catch (error) {
            console.error(`Error processing message on subject ${msg.subject}:`, error)
        }
    }
}

initNatsSubcriber()
    .then(() => console.log('NATS subscriber initialized successfully'))
    .catch(err => console.error('Error initializing NATS subscriber:', err))
    .finally(() => process.exit(0))