<script lang="ts" setup>
import DepositAdminGrid from "@layouts/deposit-admin-grid.vue";
import DepositItem from "@components/admin/deposit-item.vue";
import usePagePaginate from "@composables/usePagePaginate";
import PaginationBullets from "@components/navigation/pagination-bullets.vue";
import useAsyncQuery from "@composables/useAsyncQuery";
import LoadSpinner from "@components/ui/load-spinner.vue";
import { updateDepositStatus } from "@services/admin";
import ErrorText from "@/components/ui/error-text.vue";

const { fetchPagination, response, isSuccess, maxPage, isLoading, isError } =
    usePagePaginate("/admin/deposit/list", 10);
fetchPagination();

const { doAsyncQuery: doUpdateDepositStatus, isSuccess: isDepositSuccess } =
    useAsyncQuery(updateDepositStatus);

async function onAccept(deposit_id: number, index: number) {
    await doUpdateDepositStatus([{ deposit_id, status: 1 }]);
    if (!isDepositSuccess) return;
    response.value.data.deposits[index].status = 1;
}
async function onDecline(deposit_id: number, index: number) {
    await doUpdateDepositStatus([{ deposit_id, status: -1 }]);
    if (!isDepositSuccess) return;
    response.value.data.deposits[index].status = -1;
}
async function onFreeze(deposit_id: number, index: number) {
    await doUpdateDepositStatus([{ deposit_id, status: 2 }]);
    if (!isDepositSuccess) return;
    response.value.data.deposits[index].status = 2;
}
</script>
<template>
    <DepositAdminGrid>
        <div v-if="isSuccess">
            <!-- username="item.username" -->
            <DepositItem
                v-for="(item, index) of response.data.deposits"
                :key="index"
                :card="item.crypto_id"
                :sum="item.sum"
                :username="item.username"
                :status="item.status"
                @on-accept="onAccept(item.deposit_id, index)"
                @on-decline="onDecline(item.deposit_id, index)"
                @on-freeze="onFreeze(item.deposit_id, index)"
            />

            <PaginationBullets
                :max-page="maxPage"
                :page-name="'admin.deposit'"
            />
        </div>

        <LoadSpinner v-else-if="isLoading" />
        <ErrorText v-else-if="isError"
            >Somthing went wrong. Try refresh the page</ErrorText
        >
        <DepositItem :card="'wadawd'" :sum="22" :username="'22'" :status="0" />
        <template #title> Депозит </template>
    </DepositAdminGrid>
</template>
