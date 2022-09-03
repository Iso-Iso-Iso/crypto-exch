<script lang="ts" setup>
import NotificationGrid from "@layouts/notification-grid.vue";
import NotificationItem from "@components/user/notification-item.vue";
import PaginationBullets from "@components/navigation/pagination-bullets.vue";
import usePagePaginate from "@composables/usePagePaginate";
import LoadSpinner from "@components/ui/load-spinner.vue";
const { fetchPagination, response, maxPage, isLoading, isError, isSuccess } =
    usePagePaginate("/user/balance/history", 10);
fetchPagination();
</script>
<template>
    <NotificationGrid>
        <div v-if="isSuccess">
            <NotificationItem
                v-for="(item, index) of response.data.items"
                :key="index"
                :sum="item.sum"
                :type="item.type"
                :status="item.status"
                :date="item.created"
                :currency="item.currency"
            />
            <PaginationBullets
                :max-page="maxPage"
                :page-name="'user-notification'"
            />
        </div>
        <LoadSpinner v-else-if="isLoading"></LoadSpinner>
    </NotificationGrid>
</template>
