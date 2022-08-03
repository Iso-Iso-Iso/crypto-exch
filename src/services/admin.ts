import $api from "@/api/api";
import { AxiosRequestConfig } from "axios";
type AxiosParamsArray =
    | [any, AxiosRequestConfig<any>]
    | [AxiosRequestConfig<any>]
    | [any]
    | [];

export async function updateOrderStatus(
    params: [any, AxiosRequestConfig<any>]
) {
    return $api.patch("/admin/orders/change", ...params);
}

export async function addCurrency(params: [any, AxiosRequestConfig<any>]) {
    return $api.post("/admin/currencies/add", ...params);
}

export async function removeCurrency(params: [any, AxiosRequestConfig<any>]) {
    return $api.post("/admin/currencies/remove", ...params);
}
export async function updateCurrency(params: AxiosParamsArray = []) {
    return $api.patch("/admin/currencies/change", ...params);
}

// export async function updateUserBalance(params: AxiosParamsArray = []) {
//     return $api.patch("/admin/user/balance/change", ...params);
// }
export async function updateDepositStatus(params: AxiosParamsArray = []) {
    return $api.patch("/admin/deposit/update", ...params);
}
export async function updateWithdrawStatus(params: AxiosParamsArray = []) {
    return $api.patch("/admin/withdraw/update", ...params);
}
export async function updateSettings(params: AxiosParamsArray = []) {
    return $api.patch("/admin/settings/change", ...params);
}
//
