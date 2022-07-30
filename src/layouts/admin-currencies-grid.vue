<template>
    <div class="currency">
        <div class="currency__top">
            <p class="currency__name currency-name">currency</p>
            <p class="currency__name rate">rate</p>
            <p class="currency__name is_base">is_base</p>
            <p class="currency__name buttons">buttons</p>
        </div>
        <div class="currency__bottom">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss" src="./admin-currencies-grid.scss"></style>
