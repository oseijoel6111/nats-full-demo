
// export async function handleMessage(payload){
//     const {action} = payload;
//     console.log(`Handling action: ${action}`);
//     switch (action) {
//         case 'create':
//             console.log('Creating resource...');
//             // Add logic to create a resource
//             break;
//         case 'update':
//             console.log('Updating resource...');
//             // Add logic to update a resource
//             break;
//         case 'delete':
//             console.log('Deleting resource...');
//             // Add logic to delete a resource
//             break;
//         default:
//             console.error(`Unknown action: ${action}`);
//     }
// }

import {handlers} from './handler.js'

export async function handleMessage(subject, payload) {
  const handler = handlers[subject];
  if (handler) {
    await handler(payload);
  } else {
    console.warn(`No handler defined for subject: ${subject}`);
  }
}