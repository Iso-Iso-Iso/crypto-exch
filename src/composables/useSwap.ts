import { computed, reactive, Ref, ref } from "vue";

export default function useSwap(
    currencies: any,
    isCurrenciesLoaded: Ref<boolean>
) {
    const baseCurrency = computed(() => {
        if (!isCurrenciesLoaded.value) return 0;
        const baseCurrencyName = currencies.value?.base_currency;
        return currencies.value?.currencies[baseCurrencyName];
    });
    const usdCurrencyValue = computed(() => {
        if (!isCurrenciesLoaded.value) return 0;
        return currencies?.value?.currencies?.USD || 0;
    });

    const isValueSwaped = ref(false);

    const swapConfig = reactive({
        sum: 0,
        from_currency: "USD",
        to_currency: "UAH",
    });

    function convert(from: number, s: number) {
        if (!isCurrenciesLoaded.value) return 0;
        const result = isValueSwaped.value ? from * s : from / s;

        return +result.toFixed(2);
    }

    const convertedSum = ref(0);

    const convertAbove = () =>
        (convertedSum.value = convert(swapConfig.sum, usdCurrencyValue.value));
    const convertBelow = () =>
        (swapConfig.sum = convert(
            convertedSum.value,
            baseCurrency.value / usdCurrencyValue.value
        ));

    function swapCurrenciesOrder() {
        const from = swapConfig.from_currency;
        swapConfig.from_currency = swapConfig.to_currency;
        swapConfig.to_currency = from;

        const swapSum = swapConfig.sum;
        swapConfig.sum = convertedSum.value;
        convertedSum.value = swapSum;

        isValueSwaped.value = !isValueSwaped.value;
    }
    return {
        isValueSwaped,
        swapConfig,
        convertedSum,
        convertAbove,
        convertBelow,
        swapCurrenciesOrder,
    };
}
