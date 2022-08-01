<script lang="ts" setup>
import { watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: Boolean,
    error: Boolean,
});
function hide() {
    setTimeout(() => {
        emit("update:modelValue", false);
    }, 3000);
}
watch(() => props.modelValue, hide);
</script>
<template>
    <Transition name="toast-show">
        <div
            v-if="props.modelValue"
            class="toast"
            :class="{ toast_error: props.error }"
            @click="$emit('update:modelValue', false)"
        >
            <svg
                v-if="props.error"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
            >
                <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
                />
            </svg>
            <slot></slot></div
    ></Transition>
</template>
<style lang="scss" scoped>
.toast {
    z-index: 2;
    cursor: pointer;
    position: fixed;
    top: 30px;
    right: 20px;
    background: $primary-color;
    padding: 15px 30px;
    color: $contrast-primary-color;
    font-size: $item-title-fz;
    font-weight: $subtitle-fw;
    border-radius: 15px;
    @include flex;

    :deep(svg) {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }
    :deep(path) {
        fill: green;
    }
    &_error {
        :deep(path) {
            fill: rgb(214, 14, 124);
        }
    }
}
.toast-show-enter-active,
.toast-show-leave-active {
    @include transition;
}
.toast-show-enter-from {
    opacity: 0;
    transform: translateY(-50%);
}
.toast-show-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.toast-show-leave-to {
    opacity: 0;
    transform: translateY(50%);
}
.toast-show-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
