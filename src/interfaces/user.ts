import { AxiosResponse } from "axios";

export interface User {
    id?: number;
    is_admin?: boolean;
    login?: string;
    country?: string;
    city?: string;
    balance_usd?: number;
    balance_uah?: number;
}
export interface UserState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: User;
}

export interface UserAuth {
    access: string;
    refresh: string;
}

export interface UserOrder {
    order_id?: number;
    from_currency?: string;
    to_currency?: string;
    sum?: number;
    result_sum?: number;
    created?: string;
    status?: number;
    exc_rate?: number;
}

export interface UserOrderPagination {
    orders?: UserOrder[];
    totals?: number;
    pages?: number;
}

export type AxiosQueryResponse<T> = Promise<AxiosResponse<T>>;
