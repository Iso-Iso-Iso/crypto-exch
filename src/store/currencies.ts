import { getCurrencies } from "@services/user";

const currencies = {
    state: () => ({
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: {},
    }),
    mutations: {
        startCurrenciesFetch(state: any) {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        successCurrenciesFetch(state: any, payload: any) {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        errorCurrenciesFetch(state: any) {
            state.isLoading = false;
            state.isError = true;
        },
    },
    actions: {
        async fetchCurrencies(context: any) {
            try {
                context.commit("startCurrenciesFetch");
                const res = await getCurrencies();
                context.commit("successCurrenciesFetch", res.data);
            } catch {
                context.commit("errorCurrenciesFetch");
            }
        },
    },
};
export default currencies;
