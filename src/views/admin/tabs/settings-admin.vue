<script lang="ts" setup>
import ContentCard from "@components/ui/content-card.vue";
import Input from "@/components/forms/input.vue";
import LoadSpinner from "@/components/ui/load-spinner.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Button from "@/components/ui/button.vue";
import useAsyncQuery from "@/composables/useAsyncQuery.js";
import { updateSettings } from "@services/admin";
import AlertToast from "@/components/ui/alert-toast.vue";

const { isLoading, isSuccess, isError, doAsyncQuery } =
    useAsyncQuery(updateSettings);

const store = useStore();

const isSettingsLoading = computed(() => store.state.settings.isLoading);
const isSettingsError = computed(() => store.state.settings.isError);
const isSettingsSuccess = computed(() => store.state.settings.isSuccess);

const cardNumberForDeposit = computed(
    () => store.state.settings?.data?.crypto_wallet_id
);
const cardNumber = ref(cardNumberForDeposit.value);

function onUpdateSettings() {
    doAsyncQuery([{ crypto_wallet_id: cardNumber.value }]);
}
</script>

<template>
    <div class="card">
        <AlertToast v-model="isSuccess"> Data succesfully updated!</AlertToast>
        <AlertToast v-model="isError" error>Something went wrong!</AlertToast>
        <ContentCard>
            <LoadSpinner v-if="isSettingsLoading"></LoadSpinner>
            <div v-if="isSettingsSuccess">
                <p class="standart-text mb-small">Настройки номеры карты</p>
                <div class="">
                    <Input v-model="cardNumber" class="mb-small input" />
                    <Button @click="onUpdateSettings()">Обновить</Button>
                </div>
            </div>
        </ContentCard>
    </div>
</template>
<style lang="scss" scoped>
.card {
    max-width: 500px;
    width: 100%;
    flex: 1 1 auto;
}
.input {
    flex: 1 0 70%;
    width: 100%;
}
</style>
