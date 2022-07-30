import $api from "@/api/api";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { AxiosResponse } from "axios";
import useGetCurrentPage from "@composables/useGetCurrentPage";

export default function usePagePaginate<T>(
    queryURL: string,
    rows: number = 10
) {
    const route = useRoute();
    const currentPage = useGetCurrentPage();
    const maxPage = ref(1);
    const isLoading = ref(false);
    const isError = ref(false);
    const isSuccess = ref(false);
    const response = ref<any>(null);

    async function fetchPagination() {
        try {
            isLoading.value = true;
            isSuccess.value = false;
            isError.value = false;
            const res: AxiosResponse<T & { pages?: number }> = await $api.get(
                queryURL,
                {
                    params: { rows, page: currentPage.value },
                }
            );
            response.value = res;
            maxPage.value = res.data.pages || 1;

            isSuccess.value = true;
            return res;
        } catch {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }
    watch(() => route.query.p, fetchPagination);

    return {
        currentPage,
        isLoading,
        isError,
        isSuccess,
        response,
        maxPage,
        fetchPagination,
    };
}
