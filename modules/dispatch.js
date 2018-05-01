const globalEvents = {};
let scope;

export const addGlobalEvent = (upploadEvent, upploadFunction, scopeElement) => {
	if (!scope) scope = scopeElement;
	globalEvents[scope.meta.uniqueId] = globalEvents[scope.meta.uniqueId] || {};
	globalEvents[scope.meta.uniqueId][upploadEvent] = upploadFunction;
};

export default (event, value) => {
	if (typeof globalEvents[scope.meta.uniqueId][event] === "function") {
		globalEvents[scope.meta.uniqueId][event](value);
	}
};
