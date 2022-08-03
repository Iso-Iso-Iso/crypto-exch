import { createStore } from "vuex";
import styles from "./style";
import user from "./user";
import currencies from "./currencies";
import settings from "./settings";
const store = createStore({
    state: () => ({}),
    modules: {
        styles,
        user,
        currencies,
        settings,
    },
});

export default store;
