import { getUser } from "@services/user";
import { User, UserState } from "@interfaces/user";

const user = {
    state: () =>
        ({
            isLoading: false,
            isSuccess: false,
            isError: false,
        } as UserState | undefined),

    getters: {
        isUserHaveAdminAccess: (state: UserState) =>
            state.isSuccess && state.data?.is_admin,
    },
    mutations: {
        startUserFetching(state: UserState) {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        userFetchingComplete(state: UserState, payload: any) {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = payload;
        },
        userFetchingError(state: UserState) {
            state.isLoading = false;
            state.isError = true;
        },
        setUser(state: UserState, payload: User) {
            state.data = payload;
        },
    },

    actions: {
        async getUser(context: any) {
            try {
                if (!window.localStorage.getItem("access-token"))
                    return (context.state.isError = true);

                context.commit("startUserFetching");
                const user = await getUser();

                context.commit("userFetchingComplete", user.data);
            } catch {
                context.commit("userFetchingError");
            }
        },
    },
};

export default user;
