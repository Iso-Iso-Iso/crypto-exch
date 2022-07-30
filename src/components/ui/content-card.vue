<template>
    <div class="content-card">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.content-card {
    padding: 20px;
    background: $primary-color;
    border-radius: 20px;
    :deep(.title) {
        font-size: $item-title-fz;
        color: $contrast-primary-color;
    }
    :deep(.button) {
        padding: 5px 10px;
        color: $contrast-primary-color;
        font-size: 16px;
        @include flex;
        border: 1px solid $primary-color_light;
        border-radius: 10px;
    }
    :deep(.button_filled) {
        background: $primary-color_light;
        border: none;
    }
    :deep(.icon) {
        @include flex;
    }
    :deep(.button_active) {
        background: $contrast-primary-color;
        color: $primary-color;
        path {
            fill: $primary-color;
        }
    }
    :deep(.button_thin) {
        padding: 5px 25px;
        font-size: 13px;
    }
    :deep(svg) {
        width: 20px;
        height: 20px;
    }
    :deep(path) {
        fill: $contrast-primary-color;
    }
    :deep(p) {
        color: $contrast-primary-color;
    }
}
</style>
