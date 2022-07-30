import { computed } from "vue";
import { useStore } from "vuex";

export default function useUserProgressState() {
    const store = useStore();
    const isUserLoading = computed(() => store.state.user.isLoading);
    const isUserError = computed(() => store.state.user.isError);
    const isUserSuccess = computed(() => store.state.user.isSuccess);
    return { isUserLoading, isUserError, isUserSuccess };
}
