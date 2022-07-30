<script setup lang="ts">
import ContentCard from "@components/ui/content-card.vue";
import TextLoadPlaceholder from "@components/ui/text-load-placeholder.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => store.state.user);
const currencies = computed(() => store.state.currencies.data);
const isCurrenciesLoading = computed(() => store.state.currencies.isLoading);
const isCurrenciesError = computed(() => store.state.currencies.isError);
const isCurrenciesLoaded = computed(() => store.state.currencies.isSuccess);

const isDollarDisplay = ref(true);

const USD = computed(() => {
    if (isCurrenciesLoaded.value) return currencies?.value?.currencies?.USD;
    return 0;
});
const UAH = computed(() => {
    if (isCurrenciesLoaded.value) return 1 / USD.value;
    return 0;
});
</script>
<template>
    <ContentCard class="balance-card">
        <div class="flex-space balance-card__header">
            <h3 class="balance-card__title title">Balance</h3>
            <div class="flex-center">
                <button
                    :class="{ button_active: !isDollarDisplay }"
                    class="balance-card__button button"
                    @click="isDollarDisplay = false"
                >
                    ₴
                </button>
                <button
                    :class="{ button_active: isDollarDisplay }"
                    class="balance-card__button button"
                    @click="isDollarDisplay = true"
                >
                    $
                </button>
            </div>
        </div>
        <h2 class="balance-card__balance">
            <TextLoadPlaceholder
                :loading="user.isLoading"
                :error="user.isError"
            >
                {{
                    isDollarDisplay
                        ? `$ ${user.data?.balance_usd}`
                        : `₴ ${user.data?.balance_uah}`
                }}
                <template #error>
                    {{ isDollarDisplay ? `$ 800.50` : `₴ 800.50` }}
                </template>
            </TextLoadPlaceholder>
        </h2>
        <div class="balance-card__valut-course">
            <p class="standart-text mr-medium">
                <TextLoadPlaceholder
                    :loading="isCurrenciesLoading"
                    :error="isCurrenciesError"
                >
                    <span> USD</span> - {{ UAH?.toFixed(2) || 0 }}
                    <p class="balance-card__valut-symbol">₴</p>
                    <template #error> </template>
                </TextLoadPlaceholder>
            </p>
            <p class="standart-text">
                <TextLoadPlaceholder
                    :loading="isCurrenciesLoading"
                    :error="isCurrenciesError"
                >
                    <span> UAH</span> - {{ USD?.toFixed(3) || 0 }}
                    <p
                        class="balance-card__valut-symbol balance-card__valut-symbol_red"
                    >
                        $
                    </p>
                    <template #error> </template>
                </TextLoadPlaceholder>
            </p>
        </div>
    </ContentCard>
</template>

<style lang="scss" src="./balance-card.scss"></style>
