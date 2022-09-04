<script setup lang="ts">
import ContentCard from "@components/ui/content-card.vue";
import PaymentCard from "@components/ui/payment-card.vue";
import Input from "@components/forms/input.vue";
import Select from "@components/forms/select.vue";
import Button from "@components/ui/button.vue";
import IconPlane from "@components/icons/icon-plane.vue";
import { computed, reactive, ref, watch } from "vue";
import ukrFlag from "@assets/ukr-flag.png";
import { useStore } from "vuex";
import LoadSpinner from "@components/ui/load-spinner.vue";
import useAsyncQuery from "@composables/useAsyncQuery";
import { createWithdraw } from "@services/user";
import AlertToast from "../ui/alert-toast.vue";
import InputWithSelect from "../forms/input-with-select.vue";
import ErrorText from "../ui/error-text.vue";
import ruFlag from "@/assets/ru-flag.jpg";

const store = useStore();
const isUserLoading = computed(() => store.state.user.isLoading);
const isUserError = computed(() => store.state.user.isError);

const currencies = computed(() => store.state.currencies.data);
const isCurrenciesLoading = computed(() => store.state.currencies.isLoading);
const isCurrenciesSuccess = computed(() => store.state.currencies.isSuccess);
const isUserVerified = computed(() => store.state.user.data.is_verified);

const withdrawConfig = reactive({
    bank_id: "",
    bank_name: "Monobank",
    sum: 0,
    currency: "UAH",
});

const { doAsyncQuery, isSuccess, errorResponse, isError } = useAsyncQuery(
    createWithdraw,
    () => store.dispatch("silentGetUser")
);

function onWithdraw() {
    doAsyncQuery([withdrawConfig]);
}

const totalSum = computed(() => {
    if (isCurrenciesSuccess.value)
        return (
            (withdrawConfig.sum /
                currencies?.value?.currencies[withdrawConfig.currency]) *
                (currencies?.value?.currencies?.USD || 0) -
            5
        );
    return 0;
});

const isButtonDisabled = computed(() => {
    const isUserDataEnter =
        withdrawConfig.bank_id.length > 12 && totalSum.value > 0;

    return isUserDataEnter;
});
const errorMessage = computed(
    () => errorResponse.value?.response?.data?.error?.message
);
const isToastShow = ref(false);
watch(isSuccess, (v) => (isToastShow.value = v));

const isErrorToastShow = ref(false);
watch(isError, (v) => (isErrorToastShow.value = v));
</script>
<template>
    <ContentCard class="transaction-card">
        <AlertToast v-model="isToastShow"
            >Transaction was successfully added to order</AlertToast
        >
        <AlertToast v-model="isErrorToastShow" error
            >{{ errorMessage }}
        </AlertToast>
        <div class="flex-center">
            <PaymentCard class="transaction-card__payment-card" />
        </div>
        <div class="flex-center mb-medium">
            <h2 class="title">Transactions</h2>
        </div>
        <div class="flex-center mb-big transaction-card__method-wrapper">
            <p class="transaction-card__method transaction-card__method_active">
                Send
            </p>
            <RouterLink
                class="transaction-card__method"
                :to="{ name: 'deposit-page' }"
            >
                Apply
            </RouterLink>
        </div>
        <p class="standart-text mb-small">Pay to</p>
        <Input
            v-model.trim="withdrawConfig.bank_id"
            class="mb-small"
            dark
            placeholder="0213 - 1413 - 2242 - 5735 - 4634 - 3655"
            text-center
            type="number"
        />
        <p class="standart-text standart-text_under flex-center mb-big">
            Please enter the Wallet ID or Destination email
        </p>
        <div class="flex-space">
            <div class="transaction-card__select-wrapper">
                <p class="standart-tex mb-small">Bank</p>
                <Select
                    v-model="withdrawConfig.bank_name"
                    class="mb-small"
                    name="bank"
                    :items="['Mono Bank', 'Privat Bank', 'Other']"
                />
            </div>
            <div class="transaction-card__select-wrapper">
                <p class="standart-tex mb-small">Sum</p>
                <InputWithSelect
                    v-model="withdrawConfig.sum"
                    v-model:currentValut="withdrawConfig.currency"
                    :options="{ UAH: ukrFlag, RUB: ruFlag }"
                    :src="ukrFlag"
                    valut="UAH"
                    type="number"
                    class="mb-small"
                />
            </div>
        </div>
        <div class="flex-space transaction-card__commission">
            <div class="transaction-card__select-wrapper">
                <p class="standart-tex">Commission $5</p>
            </div>
            <div class="transaction-card__select-wrapper">
                <p class="standart-tex">Total {{ totalSum.toFixed(2) }}$</p>
            </div>
        </div>

        <LoadSpinner v-if="isUserLoading || isCurrenciesLoading"></LoadSpinner>
        <div
            v-else-if="isUserError"
            class="login-btn"
            @click="store.commit('toggleRegisterForm')"
        >
            <Button> <IconPlane class="mr-small" /> Register now </Button>
        </div>
        <ErrorText v-else-if="!isUserVerified"
            >Verified your account for transaction</ErrorText
        >
        <Button v-else :disabled="!isButtonDisabled" @click="onWithdraw()"
            ><IconPlane class="mr-small" /> Send</Button
        >
    </ContentCard>
</template>
<style lang="scss" src="./transaction-card.scss"></style>
