<script lang="ts" setup>
import { toRefs } from "vue";

defineEmits(["update:modelValue", "inputChange"]);
const props = defineProps({
    modelValue: { type: [String, Number], required: true },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    src: { type: String, default: "" },
    valut: { type: String, default: "" },
    dark: Boolean,
});
const { modelValue, type, placeholder, src } = toRefs(props);
</script>

<template>
    <label :class="{ 'input-thumbnail_dark': dark }" class="input-thumbnail">
        <p class="input-thumbnail__slot">
            <slot />
        </p>
        <input
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            @input="
                $emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value
                ),
                    $emit('inputChange')
            "
        />
        <hr class="input-thumbnail__line" />
        <div class="input-thumbnail__currency">
            <div v-show="src" class="input-thumbnail__flag">
                <img :src="src" alt="" />
            </div>
            <div v-show="valut" class="input-thumbnail__valut-name">
                {{ valut }}
            </div>
        </div>
    </label>
</template>
<style lang="scss" src="./input-thumbnail.scss"></style>
