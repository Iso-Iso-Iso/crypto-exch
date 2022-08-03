import { getSettings } from "@/services/common";

const settings = {
    state: () => ({
        isLoading: false,
        isError: false,
        isSuccess: false,
        data: {},
    }),
    mutations: {
        startSettingsFetch(state: any) {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        successSettingsFetch(state: any, payload: any) {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        errorSettingsFetch(state: any) {
            state.isLoading = false;
            state.isError = true;
        },
    },
    actions: {
        async fetchSettings(context: any) {
            try {
                context.commit("startSettingsFetch");
                const res = await getSettings();
                context.commit("successSettingsFetch", res.data);
            } catch {
                context.commit("errorSettingsFetch");
            }
        },
    },
};
export default settings;
