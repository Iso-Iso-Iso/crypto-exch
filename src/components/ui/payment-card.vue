<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TextLoadPlaceholder from "@components/ui/text-load-placeholder.vue";

const store = useStore();
const user = computed(() => store.state.user);
</script>
<template>
    <div class="card">
        <div class="card__top">
            <svg
                width="43"
                height="30"
                viewBox="0 0 43 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="42.8571"
                    height="30"
                    rx="10"
                    fill="white"
                    fill-opacity="0.56"
                />
                <line
                    x1="19.1429"
                    y1="23.4286"
                    x2="19.1429"
                    y2="6.99999"
                    stroke="#0D0D0D"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M5.14288 19.5H18.8572M9.21431 11.5714H18.8572"
                    stroke="#0D0D0D"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M24.8571 17.5714H35.1428M25.5 12H38.5714"
                    stroke="#0D0D0D"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <line
                    x1="24.2856"
                    y1="23.4286"
                    x2="24.2856"
                    y2="6.99999"
                    stroke="#0D0D0D"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M30.4286 21.6428V18.4285"
                    stroke="#0D0D0D"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M34.7144 12.2143V9.00002"
                    stroke="#0D0D0D"
                    stroke-width="2"
                    stroke-linecap="round"
                />
            </svg>
            <img src="@assets/card-logo.png" alt="" class="card__logo" />
        </div>
        <div class="card__number">
            <p class="card__1to4">4563</p>
            <p class="card__5to8">6748</p>
            <p class="card__9to12">3754</p>
            <p class="card__13to16">1773</p>
        </div>
        <div class="card__bottom">
            <p class="card__amount">
                <TextLoadPlaceholder
                    :loading="user.isLoading"
                    :error="user.isError"
                >
                    $ {{ user?.data?.balance_usd }}
                    <template #error> $ 880.50 </template>
                </TextLoadPlaceholder>
            </p>
            <img src="@assets/mastercard.png" alt="" class="card__mastercard" />
        </div>
    </div>
</template>
<style lang="scss" src="./payment-card.scss" scoped></style>
