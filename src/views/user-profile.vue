<script lang="ts" setup>
import usePagePaginate from "@/composables/usePagePaginate";
import ProfileInfo from "@/layouts/profile-info.vue";
import NotificationGrid from "@/layouts/notification-grid.vue";
import NotificationItem from "@/components/user/notification-item.vue";
import LoadSpinner from "@/components/ui/load-spinner.vue";
import { useStore } from "vuex";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import PaginationBullets from "@/components/navigation/pagination-bullets.vue";

const store = useStore();
const user = computed(() => store.state.user);
const router = useRouter();

const { fetchPagination, response, isLoading, isSuccess, maxPage } =
    usePagePaginate("/user/balance/history", 5);

fetchPagination();
watch(
    () => user.value.isError,
    (v) => (v ? router.push({ name: "home-page" }) : false)
);
</script>
<template>
    <div class="user-profile" v-if="user.isSuccess">
        <ProfileInfo class="user-profile__card"></ProfileInfo>
        <NotificationGrid>
            <template #subtitle>Latest 5 transaction</template>
            <div v-if="isSuccess">
                <NotificationItem
                    v-for="(item, index) of response.data.items"
                    :key="index"
                    :sum="item.sum"
                    :type="item.type"
                    :status="item.status"
                    :date="item.created"
                />
                <PaginationBullets
                    :max-page="maxPage"
                    :page-name="'user-profile'"
                />
            </div>
            <LoadSpinner v-else-if="isLoading"></LoadSpinner>
        </NotificationGrid>
    </div>
</template>
<style lang="scss">
.user-profile {
    .payment-history-wrapper {
        padding: 0;
    }
    .payment-history {
        max-width: 650px;
        padding: 30px;
        min-height: 450px;
        margin-bottom: 30px;
    }
    .payment-history__name {
        flex: 0 0 auto;
    }
    .payment-history__date {
        flex: 0 0 auto;
    }
    flex: 1 1 70%;
    padding: 20px 60px;
    .profile {
        margin: 0 auto;
        margin-bottom: 40px;
    }
    @media screen and(max-width:1440px) {
        padding: 20px 40px;
        flex: 1 1 100%;
        width: 100%;
    }
    @media screen and(max-width:425px) {
        padding: 20px;
    }
}
</style>
