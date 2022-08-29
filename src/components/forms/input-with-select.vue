<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";
import IconArrow from "../icons/icon-arrow.vue";

defineEmits(["update:modelValue", "inputChange", "update:currentValut"]);
const props = defineProps({
    modelValue: { type: [String, Number], required: true },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    currentValut: { type: String, required: true },
    options: { type: Object, required: true },
    dark: Boolean,
});
type OptionItem = {
    [key: string]: string;
};
const { modelValue, type, placeholder, options, currentValut } = toRefs(props);

const isShowSelect = ref(false);

const currentValutFlag = computed(() => options.value[currentValut.value]);
// TODO! refactor function
function hideOnClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement;

    const parent = target.closest(".input-thumbnail");
    if (parent) return;

    isShowSelect.value = false;
}

onMounted(() => {
    document.addEventListener("click", hideOnClick);
});
onUnmounted(() => {
    document.removeEventListener("click", hideOnClick);
});
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
        <div
            class="input-thumbnail__currency relative drop-list-wrapper"
            @click="isShowSelect = true"
        >
            <div class="flex-center">
                <div class="input-thumbnail__thumbnail">
                    <div
                        v-show="currentValutFlag"
                        class="input-thumbnail__flag"
                    >
                        <img :src="(currentValutFlag as string)" alt="" />
                    </div>
                    <div
                        v-show="currentValut"
                        class="input-thumbnail__valut-name"
                    >
                        {{ currentValut }}
                    </div>
                </div>
                <IconArrow />
            </div>
            <div v-if="isShowSelect" class="input-thumbnail__drop-list">
                <div
                    v-for="(value,key ,index) in (options as OptionItem)"
                    :key="index"
                    class="input-thumbnail__currency"
                    @click="
                        $emit('update:currentValut', key),
                            (isShowSelect = false)
                    "
                >
                    <div v-show="value" class="input-thumbnail__flag">
                        <img :src="(value as string)" alt="" />
                    </div>
                    <div v-show="key" class="input-thumbnail__valut-name">
                        {{ key }}
                    </div>
                </div>
            </div>
        </div>
    </label>
</template>
<style lang="scss" src="./input-thumbnail.scss"></style>
