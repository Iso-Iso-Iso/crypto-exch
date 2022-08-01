<script setup lang="ts">
import InputThumbnail from "@components/forms/input-thumbnail.vue";
import usdtFlag from "@assets/usdt-flag.png";
import ukrFlag from "@assets/ukr-flag.png";
import LoadSpinner from "@components/ui/load-spinner.vue";

import { computed } from "vue";
import { swapBalance, getCurrencies } from "@services/user";
import useAsyncQuery from "@composables/useAsyncQuery";
import { useStore } from "vuex";
import ErrorText from "@components/ui/error-text.vue";
import useSwap from "@composables/useSwap";
import IconPlane from "../icons/icon-plane.vue";
import Button from "../ui/button.vue";
// TODO! use composables

const store = useStore();
const isUserLoading = computed(() => store.state.user.isLoading);
const isUserError = computed(() => store.state.user.isError);

const { doAsyncQuery, isLoading: isSwaping } = useAsyncQuery(
    swapBalance,
    (res: any) => store.commit("setUser", res.data)
);

const currencies = computed(() => store.state.currencies.data);
const isCurrenciesLoading = computed(() => store.state.currencies.isLoading);
const isCurrenciesLoaded = computed(() => store.state.currencies.isSuccess);

// const {
//     doAsyncQuery: doGetCurrencies,
//     response: currencies,
//     isSuccess: isCurrenciesLoaded,
//     isLoading: isCurrenciesLoading,
// } = useAsyncQuery(getCurrencies);
// doGetCurrencies();

const {
    swapConfig,
    isValueSwaped,
    convertedSum,
    convertAbove,
    swapCurrenciesOrder,
    convertBelow,
} = useSwap(currencies, isCurrenciesLoaded);

function onSwap() {
    if (swapConfig.sum == 0) return;
    doAsyncQuery([swapConfig]);
}
const isAvailableForSwap = computed(() => swapConfig.sum > 0);
</script>
<template>
    <div class="swap">
        <h2 class="swap__title">Swap</h2>
        <h3 class="swap__sub-title">Amount</h3>
        <InputThumbnail
            v-if="!isValueSwaped"
            v-model.number="swapConfig.sum"
            dark
            valut="USDT"
            :src="usdtFlag"
            type="number"
            @input-change="convertAbove()"
            >$</InputThumbnail
        >
        <InputThumbnail
            v-else
            v-model.number="swapConfig.sum"
            dark
            valut="UAH"
            :src="ukrFlag"
            type="number"
            @input-change="convertAbove()"
            >₴</InputThumbnail
        >
        <button @click="swapCurrenciesOrder()">
            <svg
                width="15"
                height="18"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="swap__svg"
            >
                <path
                    d="M7.68281 14L4.36563 10.605L5.0875 9.8875L7.15 11.9875V6.4575H8.18125V12.005L10.2781 9.8875L11 10.6225L7.68281 14ZM2.78438 7.5425V2.0125L0.721875 4.1125L0 3.3775L3.31719 0L6.63437 3.3775L5.9125 4.1125L3.81563 1.995V7.5425H2.78438Z"
                    fill="#C9C9C9"
                />
            </svg>
        </button>
        <InputThumbnail
            v-if="!isValueSwaped"
            v-model.number="convertedSum"
            dark
            valut="UAH"
            :src="ukrFlag"
            type="number"
            @input-change="convertBelow()"
            >₴</InputThumbnail
        >
        <InputThumbnail
            v-else
            v-model.number="convertedSum"
            dark
            valut="USDT"
            :src="usdtFlag"
            type="number"
            @input-change="convertBelow()"
            >$</InputThumbnail
        >
        <LoadSpinner v-if="isCurrenciesLoading || isUserLoading || isSwaping" />
        <RouterLink
            v-else-if="isUserError"
            :to="{ name: 'user-registration' }"
            class="w-100"
        >
            <Button> <IconPlane class="mr-small" /> Register now </Button>
        </RouterLink>

        <button
            v-else
            :disabled="!isAvailableForSwap"
            class="swap__button"
            @click="onSwap"
        >
            <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9.07969 16L5.15938 12.12L6.0125 11.3L8.45 13.7V7.38H9.66875V13.72L12.1469 11.3L13 12.14L9.07969 16ZM3.29063 8.62V2.3L0.853125 4.7L0 3.86L3.92031 0L7.84062 3.86L6.9875 4.7L4.50938 2.28V8.62H3.29063Z"
                    fill="#0D0D0D"
                />
            </svg>
            Swap
        </button>
    </div>
</template>
<style lang="scss" src="./swap.scss" scoped></style>
