<script lang="ts" setup>
import DepositAdminGrid from "@layouts/deposit-admin-grid.vue";
import DepositItem from "@components/admin/deposit-item.vue";
import usePagePaginate from "@composables/usePagePaginate";
import PaginationBullets from "@components/navigation/pagination-bullets.vue";
import LoadSpinner from "@components/ui/load-spinner.vue";
import useAsyncQuery from "@composables/useAsyncQuery";
import { updateWithdrawStatus } from "@services/admin";
import ErrorText from "@/components/ui/error-text.vue";

const { fetchPagination, response, isSuccess, maxPage, isLoading, isError } =
    usePagePaginate("/admin/withdraw/list", 10);
fetchPagination();

const { doAsyncQuery: doUpdateWithdrawStatus, isSuccess: isWithdrawSuccess } =
    useAsyncQuery(updateWithdrawStatus);

async function onAccept(withdraw_id: number, index: number) {
    await doUpdateWithdrawStatus([{ withdraw_id, status: 1 }]);
    if (!isWithdrawSuccess.value) return;
    response.value.data.withraws[index].status = 1;
}
async function onDecline(withdraw_id: number, index: number) {
    await doUpdateWithdrawStatus([{ withdraw_id, status: -1 }]);
    if (!isWithdrawSuccess.value) return;
    response.value.data.withraws[index].status = -1;
}

async function onFreeze(withdraw_id: number, index: number) {
    await doUpdateWithdrawStatus([{ withdraw_id, status: 2 }]);
    if (!isWithdrawSuccess.value) return;
    response.value.data.deposits[index].status = 2;
}
</script>
<template>
    <DepositAdminGrid>
        <div v-if="isSuccess">
            <DepositItem
                v-for="(item, index) of response.data.withraws"
                :key="index"
                :username="item.bank_name"
                :card="item.bank_id"
                :sum="item.sum"
                :status="item.status"
                @on-accept="onAccept(item.withdraw_id, index)"
                @on-decline="onDecline(item.withdraw_id, index)"
                @on-freeze="onFreeze(item.withdraw_id, index)"
            />
            <PaginationBullets
                :max-page="maxPage"
                :page-name="'admin.transaction'"
            />
        </div>
        <LoadSpinner v-else-if="isLoading" />
        <ErrorText v-else-if="isError"
            >Somthing went wrong. Try refresh the page</ErrorText
        >
        <template #title> Выводы </template>
    </DepositAdminGrid>
</template>
