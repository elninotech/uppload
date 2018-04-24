import metaData from "./meta";

const globalEvents = {};

export const addGlobalEvent = (upploadEvent, upploadFunction) => {
    globalEvents[upploadEvent] = upploadFunction;
};

export default (event, value = undefined) => {
    if (typeof globalEvents[event] === "function") {
        globalEvents[event](value);
    }
}