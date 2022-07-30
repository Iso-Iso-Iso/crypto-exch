<script setup lang="ts">
import { toRefs } from "vue";

defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: Boolean,
});
const { modelValue } = toRefs(props);
</script>

<template>
    <div
        :class="{ checkbox_active: modelValue }"
        class="checkbox"
        @click="$emit('update:modelValue', !modelValue)"
    >
        <div class="checkbox__dot"></div>
    </div>
</template>
<style lang="scss" src="./checkbox.scss" scoped></style>
