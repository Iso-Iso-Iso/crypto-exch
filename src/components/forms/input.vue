<script lang="ts" setup>
import { ref, toRefs } from "vue";

defineEmits(["update:modelValue"]);
const props = defineProps({
    dark: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    textCenter: { type: Boolean, default: false },
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number], required: true },
});
const {
    dark,
    placeholder,
    textCenter,
    type: initialType,
    modelValue,
} = toRefs(props);

const type = ref(initialType.value);
</script>

<template>
    <div
        :class="{ input_dark: dark, 'input_text-center': textCenter }"
        class="input"
    >
        <input
            :placeholder="placeholder"
            :type="type"
            :value="modelValue"
            @input="
                $emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value
                )
            "
        />
    </div>
</template>
<style lang="scss" scoped src="./input.scss"></style>
