<script lang="ts" setup>
import AdminCurrenciesGrid from "@layouts/admin-currencies-grid.vue";
import CurrencyItem from "@components/admin/currency-item.vue";
import useAsyncQuery from "@composables/useAsyncQuery";
import { getCurrencies } from "@services/user";
import LoadSpinner from "@components/ui/load-spinner.vue";
import { updateCurrency } from "@services/admin";
import ErrorText from "@components/ui/error-text.vue";

const {
    doAsyncQuery: doGetCurrencies,
    response: currencies,
    isSuccess: isCurrenciesLoaded,
    isLoading: isCurrenciesLoading,
} = useAsyncQuery(getCurrencies);
doGetCurrencies();

const {
    doAsyncQuery: doUpdateCurrency,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    errorResponse,
} = useAsyncQuery(updateCurrency);
async function onSave(payload: any) {
    await doUpdateCurrency([payload]);
}
</script>
<template>
    <AdminCurrenciesGrid>
        <div v-if="isCurrenciesLoaded">
            <CurrencyItem
                v-for="( value,key, index) in (currencies!.data.currencies as object)"
                :key="index"
                :currency="key"
                :rate="value"
                :is-base="key==currencies!.data.base_currency"
                @on-save="onSave"
            />
        </div>
        <LoadSpinner v-else-if="isCurrenciesLoading" />
        <LoadSpinner v-if="isUpdateLoading" />
        <ErrorText v-if="isUpdateError">
            is error : {{ isUpdateError }} <br />
            Server response:{{ errorResponse?.response?.data.error.message }}
        </ErrorText>
    </AdminCurrenciesGrid>
</template>
