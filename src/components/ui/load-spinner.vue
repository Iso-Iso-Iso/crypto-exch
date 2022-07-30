<template>
    <div class="flex-center spinner-wrapper">
        <div class="spinner"></div>
    </div>
</template>
<style lang="scss" scoped>
.spinner-wrapper {
    width: 100%;
}
.spinner {
    height: 50px;
    width: 50px;
    border-left: 3px solid $attention-color;
    border-bottom: 3px solid $attention-color;
    border-right: 3px solid $attention-color;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
