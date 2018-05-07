const globalEvents = {};
let scope;

/**
 * Add a event for user's listener
 * @param {String} upploadEvent - Name of event
 * @param {Function} upploadFunction - Callback function
 * @param {Object} scopeElement - Parent Uppload object
 */
export const addGlobalEvent = (upploadEvent, upploadFunction, scopeElement) => {
	if (!scope) scope = scopeElement;
	globalEvents[scope.meta.uniqueId] = globalEvents[scope.meta.uniqueId] || {};
	globalEvents[scope.meta.uniqueId][upploadEvent] = upploadFunction;
};

/**
 * Initialization function for Instagram service
 * @param {Function} event - User's callback function
 * @param {String} value - Param value
 */
export default (event, value) => {
	if (!scope) return;
	if (typeof globalEvents[scope.meta.uniqueId][event] === "function") {
		globalEvents[scope.meta.uniqueId][event](value);
	}
};
