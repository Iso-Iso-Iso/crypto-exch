<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TextLoadPlaceholder from "../ui/text-load-placeholder.vue";
const store = useStore();
const currencies = computed(() => store.state.currencies.data);
const isCurrenciesLoading = computed(() => store.state.currencies.isLoading);
const isCurrenciesError = computed(() => store.state.currencies.isError);
const isCurrenciesLoaded = computed(() => store.state.currencies.isSuccess);

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
</template>
<style lang="scss">
.balance-card {
    &__valut-course,
    &__valut-symbol {
        color: $contrast-primary-color;
        .standart-text {
            font-size: 14px;
            @media screen and(max-width:768px) {
                font-size: 12px;
            }
        }
    }
    &__valut-course {
        @include flex(flex-end);

        .standart-text {
            @media screen and(max-width:510px) {
                font-size: 10px;
            }
            span {
                margin-right: 5px;
                @media screen and(max-width:510px) {
                    font-size: 10px;
                }
            }
            @include flex;
            width: max-content;
        }
    }
    &__valut-symbol {
        @include flex;
        background: #00c120;
        padding: 5px 10px;
        margin-left: 10px;
        border-radius: 5px;
        color: $primary-color !important;
        &_red {
            background: #ff1a1a;
        }
        @media screen and(max-width:510px) {
            padding: 2px 5px;
        }
        @media screen and(max-width:768px) {
            padding: 5px 8px;
        }
    }
}
</style>
