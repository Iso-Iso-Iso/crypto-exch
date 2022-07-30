import { loginUser as loginUserService } from "@services/auth";
import { ref } from "vue";

export default function useUserLogin() {
    const isLoading = ref(false);
    const isError = ref(false);
    const isSuccess = ref(false);

    async function loginUser(payload: any, callback?: () => void) {
        try {
            isLoading.value = true;
            const user = await loginUserService(payload);
            const { access, refresh } = user.data;

            window.localStorage.setItem("access-token", access);
            window.localStorage.setItem("refresh-token", refresh);
            isSuccess.value = true;
            if (callback) callback();
        } catch {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }
    return { isLoading, isError, isSuccess, loginUser };
}
