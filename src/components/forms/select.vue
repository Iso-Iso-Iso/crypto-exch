<script lang="ts" setup>
import { onMounted, onUnmounted, ref, toRefs } from "vue";
import IconTriangle from "@components/icons/icon-triangle.vue";

const $emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    name: { type: String, required: true },
    modelValue: { type: String, required: true },
    items: { type: Array, required: true },
});
const { name, items, modelValue } = toRefs(props);

const isSelectActive = ref(false);
const select = ref<HTMLDivElement | null>(null);

function onSpaceClick(e: MouseEvent) {
    if (!select.value) return;
    const isHaveParent = (e.target as HTMLDivElement).closest(".select");
    if (!isHaveParent) isSelectActive.value = false;
}
onMounted(() => {
    document.addEventListener("click", onSpaceClick);
});
onUnmounted(() => {
    document.removeEventListener("click", onSpaceClick);
});

function onSelect(item: string) {
    $emit("update:modelValue", item);
    isSelectActive.value = !isSelectActive.value;
}
</script>

<template>
    <div ref="select" class="select">
        <div class="select__value" @click="isSelectActive = !isSelectActive">
            {{ modelValue }}
            <IconTriangle />
        </div>
        <div
            :class="{ 'select__drop-menu_active': isSelectActive }"
            class="select__drop-menu"
        >
            <label
                v-for="(item, index) of (items as string[])"
                :key="index"
                class="select__item"
                @click="isSelectActive = !isSelectActive"
            >
                {{ item }}
                <input
                    type="radio"
                    :name="name"
                    :value="item"
                    @click="onSelect(item)"
                />
            </label>
        </div>
    </div>
</template>
<style lang="scss" scoped src="./select.scss"></style>
