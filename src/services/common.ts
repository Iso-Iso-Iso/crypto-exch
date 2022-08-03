import $api from "@/api/api";
import { AxiosRequestConfig } from "axios";

type AxiosParamsArray =
    | [any, AxiosRequestConfig<any>]
    | [AxiosRequestConfig<any>]
    | [any]
    | [];

export async function getSettings(params: AxiosParamsArray = []) {
    return $api.get("/settings/get", ...params);
}
