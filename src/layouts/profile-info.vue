<script lang="ts" setup>
import PaymentCard from "@/components/ui/payment-card.vue";
import CurrencyCourse from "@/components/user/currency-course.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import TextLoadPlaceholder from "@/components/ui/text-load-placeholder.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

const user = computed(() => store.state.user);
function logOut() {
    store.commit("logOut");
    window.localStorage.removeItem("access-token");
    window.localStorage.removeItem("refresh-token");
    router.push({ name: "home-page" });
}
</script>
<template>
    <div class="profile">
        <PaymentCard class="mr-small"></PaymentCard>
        <div class="profile__right">
            <div class="profile__balance">
                Main Balance <br />

                <TextLoadPlaceholder
                    :loading="user.isLoading"
                    :error="user.isError"
                >
                    {{ user.data?.balance_usd }}$
                    <template #error> 880$ </template>
                </TextLoadPlaceholder>
            </div>
            <button class="profile__log-out" @click="logOut()">
                <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.58333 17C1.16111 17 0.791667 16.8583 0.475 16.575C0.158333 16.2917 0 15.9611 0 15.5833V1.41667C0 1.03889 0.158333 0.708333 0.475 0.425C0.791667 0.141667 1.16111 0 1.58333 0H9.2625V1.41667H1.58333V15.5833H9.2625V17H1.58333ZM14.4083 12.6319L13.2736 11.6167L15.9653 9.20833H6.72917V7.79167H15.9125L13.2208 5.38333L14.3556 4.36806L19 8.52361L14.4083 12.6319Z"
                        fill="white"
                    />
                </svg>
                Log out
            </button>
            <div class="profile__track">
                <CurrencyCourse />
            </div>
        </div>
    </div>
</template>
<style lang="scss" src="./profile-info.scss" scoped></style>
