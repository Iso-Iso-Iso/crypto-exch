import axios from "axios";
import { refreshAccessToken } from "@services/auth";
// const baseURL = "https://excapi.7o7.co/";

const $api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    config!.headers!.Authorization = `Bearer ${window.localStorage.getItem(
        "access-token"
    )}`;
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (err) => {
        const requestConfig = err.config;

        try {
            if (
                err.response.status == 401 &&
                err.config &&
                !err.config._isRetry
            ) {
                requestConfig._isRetry = true;
                const { access } = (await refreshAccessToken()).data;
                window.localStorage.setItem("access-token", access);

                $api.request(requestConfig);
            }
        } catch (err) {
            console.log(err, "^_^");
            throw err;
        }
        throw err;
    }
);
export default $api;
