<script lang="ts" setup>
const props = defineProps({
    disabled: Boolean,
});
</script>
<template>
    <button :disabled="disabled" class="button"><slot></slot></button>
</template>
<style lang="scss" scoped src="./button.scss"></style>
