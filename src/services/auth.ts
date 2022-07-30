// import $api from "@/api/api";
import axios, { AxiosRequestConfig } from "axios";
import { AxiosQueryResponse, UserAuth, User } from "@interfaces/user";
type AxiosParamsArray =
    | [any, AxiosRequestConfig<any>]
    | [AxiosRequestConfig<any>]
    | [any]
    | [];

export async function loginUser(user: User): AxiosQueryResponse<UserAuth> {
    return axios.post("/api/auth/access-token", user);
}

export async function refreshAccessToken(): AxiosQueryResponse<UserAuth> {
    const refreshToken = window.localStorage.getItem("refresh-token");

    return axios.post(
        "/api/auth/refresh-token",
        {},
        {
            headers: { Authorization: `Bearer ${refreshToken}` },
        }
    );
}

export async function registerUser(
    params: AxiosParamsArray = []
): AxiosQueryResponse<UserAuth> {
    return axios.post("/api/auth/register", ...params);
}
