import { AxiosQueryResponse } from "@interfaces/user";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ref } from "vue";
type AxiosParamsArray =
    | [any, AxiosRequestConfig<any>]
    | [AxiosRequestConfig<any>]
    | [any];

export default function useAsyncQuery<T = any, E = any>(
    callback: (a?: AxiosParamsArray) => AxiosQueryResponse<T>,
    onSuccessCallback?: (p: AxiosResponse<T>) => void
) {
    const isSuccess = ref(false);
    const isError = ref(false);
    const isLoading = ref(false);
    const response = ref<AxiosResponse<T> | undefined>();
    const errorResponse = ref<AxiosError<E> | undefined>();

    async function doAsyncQuery(params?: AxiosParamsArray) {
        try {
            isSuccess.value = false;
            isError.value = false;
            isLoading.value = true;
            const res = await callback(params);
            response.value = res;
            isSuccess.value = true;
            if (onSuccessCallback) onSuccessCallback(res);
            return res;
        } catch (err: any) {
            isError.value = true;
            errorResponse.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        isError,
        isSuccess,
        response,
        doAsyncQuery,
        errorResponse,
    };
}
