import {KEYS} from "./constants";

const SessionManager = {
    push(value) {
        sessionStorage.setItem(KEYS.SESSION_KEY, JSON.stringify(value))
    },

    updateItem(value) {
        sessionStorage.setItem(KEYS.SESSION_KEY, JSON.stringify(value))
    },

    get() {
        const session = sessionStorage.getItem(KEYS.SESSION_KEY)
        if (session) {
            try {
                return JSON.parse(session);
            } catch (error) {
                this.pop(KEYS.SESSION_KEY);
                return undefined;
            }
        }
    },

    pop() {
        sessionStorage.removeItem(KEYS.SESSION_KEY);
    }
}

export default SessionManager;