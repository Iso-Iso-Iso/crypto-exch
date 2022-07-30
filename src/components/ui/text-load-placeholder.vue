<script lang="ts" setup>
const props = defineProps({
    loading: Boolean,
    error: Boolean,
});
</script>
<template>
    <div v-if="props.loading" class="text-load-placeholder"></div>
    <slot v-else-if="props.error" name="error"></slot>
    <slot v-else></slot>
</template>
<style lang="scss">
.text-load-placeholder {
    height: 20px;
    min-width: 100px;
    width: 100%;
    background: gray;
}
</style>
