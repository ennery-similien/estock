import {KEYS} from "./constants";

const localStorageManager = {
    push(value) {
        const token = this.get();

        if(token && token === value)
            return;

        localStorage.setItem(KEYS.TOKEN_KEY, value)
    },

    updateItem(login) {
        const tokenAtual = this.getItem()
        login.token = tokenAtual.token

        localStorage.setItem("login", JSON.stringify(login))
    },

    get() {
        try {
            return localStorage.getItem(KEYS.TOKEN_KEY);
        } catch (error) {
            this.pop(KEYS.TOKEN_KEY);
            return undefined;
        }
    },

    pop() {
        localStorage.removeItem(KEYS.TOKEN_KEY);
    }
}

export default localStorageManager;