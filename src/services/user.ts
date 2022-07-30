import $api from "@/api/api";
import { AxiosRequestConfig } from "axios";
type AxiosParamsArray =
    | [any, AxiosRequestConfig<any>]
    | [AxiosRequestConfig<any>]
    | [any]
    | [];

export async function getUser() {
    return $api.get("/user/get", { withCredentials: true });
}
// move from user services
export async function getCurrencies(params: AxiosParamsArray = []) {
    return $api.get("/currencies/get", ...params);
}
export async function convertPrice(params: AxiosParamsArray = []) {
    return $api.get("/user/currency/convert_price", ...params);
}

export async function createDeposit(params: AxiosParamsArray = []) {
    return $api.post("/user/balance/deposit", ...params);
}

export async function swapBalance(params: AxiosParamsArray = []) {
    return $api.post("/user/balance/swap", ...params);
}
export async function createWithdraw(params: AxiosParamsArray = []) {
    return $api.post("/user/balance/withdraw", ...params);
}
