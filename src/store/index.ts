import { createStore } from "vuex";
import styles from "./style";
import user from "./user";
import currencies from "./currencies";
const store = createStore({
    state: () => ({}),
    modules: {
        styles,
        user,
        currencies,
    },
});

export default store;
