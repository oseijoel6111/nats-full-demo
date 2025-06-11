import { EVENTS } from './eventTypes.js'

export const handlers = {
    [EVENTS.ITEM_CREATED]: async (payload) => {
        console.log('Item Created:', payload);
        // logic here
    },
    [EVENTS.ITEM_UPDATED]: async (payload) => {
        console.log('Item Updated:', payload);
    },
    [EVENTS.FORM_CREATED]: async (payload) => {
        console.log('Form Created:', payload);
    },
};