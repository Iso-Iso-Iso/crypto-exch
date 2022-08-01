<script setup lang="ts">
import InputThumbnail from "@components/forms/input-thumbnail.vue";
import usdtFlag from "@assets/usdt-flag.png";
import { computed, reactive, ref, watch } from "vue";
import { createDeposit } from "@services/user";
import useAsyncQuery from "@composables/useAsyncQuery";
import Input from "@components/forms/input.vue";
import LoadSpinner from "@components/ui/load-spinner.vue";
import useUserProgressState from "@composables/useUserProgressState";
import ErrorText from "@components/ui/error-text.vue";
import SuccessText from "@components/ui/success-text.vue";
import Button from "../ui/button.vue";
import IconPlane from "../icons/icon-plane.vue";
import AlertToast from "../ui/alert-toast.vue";

const addTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
};

const { isUserError, isUserLoading } = useUserProgressState();

const depositConfig = reactive({
    sum: 0,
    crypto_id: "",
});

const { isLoading, isError, isSuccess, doAsyncQuery } = useAsyncQuery(
    createDeposit,
    () => ((depositConfig.sum = 0), (depositConfig.crypto_id = ""))
);

function onCreateDeposit() {
    if (depositConfig.sum == 0) return;
    doAsyncQuery([depositConfig]);
}
const cardNumberForDeposit = ref("TENmG7atCyVogAkWr6NWNbZ");
const commission = computed(() => ((depositConfig.sum / 100) * 2).toFixed(2));

const isAvailableForSwap = computed(() => {
    const isAvailableForSwap =
        depositConfig.sum > 0 && depositConfig.crypto_id.length > 6;

    return isAvailableForSwap;
});
const isToastShow = ref(false);
watch(isSuccess, (v) => (isToastShow.value = v));
</script>
<template>
    <div class="deposit">
        <AlertToast v-model="isToastShow"
            >Payment was successfully added to order</AlertToast
        >
        <h2 class="deposit__title text-center">Depoist</h2>
        <h3 class="deposit__sub-title">Your crypto wallet*</h3>
        <Input v-model="depositConfig.crypto_id" class="mb-small" dark />
        <h3 class="deposit__sub-title">Amount*</h3>
        <InputThumbnail
            v-model="depositConfig.sum"
            class="mb-small"
            type="number"
            valut="USDT"
            :src="usdtFlag"
            dark
            >$</InputThumbnail
        >
        <div class="deposit__currency mb-small">
            <p>Commission</p>
            <p>${{ commission }}</p>
        </div>
        <div class="deposit__wallet">
            <label for="wallet" class="deposit__label">Trc-20</label>
            <p type="text" name="wallet" class="deposit__input">
                {{ cardNumberForDeposit }}
            </p>
            <div
                class="deposit__copy"
                @click="addTextToClipboard(cardNumberForDeposit)"
            >
                <svg
                    width="10"
                    height="11"
                    viewBox="0 0 6 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.58824 5.95C1.44706 5.95 1.32353 5.8975 1.21765 5.7925C1.11176 5.6875 1.05882 5.565 1.05882 5.425V0.525C1.05882 0.385 1.11176 0.2625 1.21765 0.1575C1.32353 0.0525 1.44706 0 1.58824 0H5.47059C5.61176 0 5.73529 0.0525 5.84118 0.1575C5.94706 0.2625 6 0.385 6 0.525V5.425C6 5.565 5.94706 5.6875 5.84118 5.7925C5.73529 5.8975 5.61176 5.95 5.47059 5.95H1.58824ZM1.58824 5.425H5.47059V0.525H1.58824V5.425ZM0.529412 7C0.388235 7 0.264706 6.9475 0.158824 6.8425C0.0529412 6.7375 0 6.615 0 6.475V1.19875H0.529412V6.475H4.71176V7H0.529412ZM1.58824 0.525V5.425V0.525Z"
                        fill="#655C5C"
                    />
                </svg>
            </div>
        </div>
        <p class="deposit__text">
            Attention! send only USDT on the TRC-20 network to this address,
            otherwise your money will be lost. If you send money through another
            network, the transaction will burn on the blockchain
        </p>
        <LoadSpinner v-if="isLoading || isUserLoading"></LoadSpinner>
        <RouterLink
            v-else-if="isUserError"
            :to="{ name: 'user-registration' }"
            class="w-100"
        >
            <Button> <IconPlane class="mr-small" /> Register now</Button>
        </RouterLink>
        <button
            v-else
            class="deposit__button mb-small"
            :disabled="!isAvailableForSwap"
            @click="onCreateDeposit()"
        >
            <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M14.8088 0.182012C14.7245 0.0980622 14.6179 0.0399384 14.5017 0.0144748C14.3854 -0.0109888 14.2643 -0.00273367 14.1526 0.0382696L0.403324 5.03801C0.284748 5.08299 0.182661 5.16297 0.110621 5.26735C0.0385821 5.37172 0 5.49554 0 5.62236C0 5.74918 0.0385821 5.873 0.110621 5.97737C0.182661 6.08174 0.284748 6.16173 0.403324 6.2067L5.7718 8.35034L9.73409 4.37555L10.6153 5.25675L6.63425 9.2378L8.78414 14.6063C8.83046 14.7226 8.91062 14.8223 9.01425 14.8925C9.11788 14.9627 9.2402 15.0001 9.36536 15C9.49166 14.9974 9.61421 14.9566 9.71685 14.883C9.81949 14.8093 9.89741 14.7063 9.94033 14.5875L14.9401 0.838229C14.9827 0.727657 14.9929 0.607259 14.9697 0.491074C14.9465 0.374888 14.8907 0.267702 14.8088 0.182012Z"
                    fill="#0D0D0D"
                />
            </svg>
            Payment done!
        </button>

        <ErrorText v-if="isError"
            >Payment error. Please try again later</ErrorText
        >
    </div>
</template>

<style lang="scss" scoped src="./deposit.scss"></style>
