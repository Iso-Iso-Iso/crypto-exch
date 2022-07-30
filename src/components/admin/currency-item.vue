<script lang="ts" setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["onSave"]);

const props = defineProps({
    currency: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    isBase: { type: Boolean, required: true },
});
const currency = reactive({ ...props, is_base: props.isBase });

const isChangeMode = ref(false);
function save() {
    isChangeMode.value = false;
    const isChangesWas =
        currency.rate != props.rate || currency.is_base != props.isBase;

    if (!isChangesWas) return;
    emit("onSave", currency);
}
</script>

<template>
    <div class="currency__item">
        <div class="currency__currency-name currency-name">
            {{ currency.currency }}
        </div>
        <div class="currency__rate rate">
            <p v-if="!isChangeMode">
                {{ currency.rate }}
            </p>
            <input v-else v-model="currency.rate" type="number" />
        </div>
        <div class="currency__is_base is_base">
            <p v-if="!isChangeMode">
                {{ currency.is_base }}
            </p>
            <input v-else v-model="currency.is_base" type="checkbox" />
        </div>
        <div v-if="!isChangeMode" class="currency__buttons">
            <button
                class="currency__accept"
                @click="isChangeMode = !isChangeMode"
            >
                Change
            </button>
            <button class="currency__decline">Delete</button>
        </div>
        <div v-else class="currency__buttons">
            <button class="currency__accept" @click="save()">Save</button>
        </div>
    </div>
</template>
