<script lang="ts" setup>
import BalanceCard from "@components/user/balance-card.vue";
import Swap from "@components/swap/swap.vue";
</script>
<template>
    <div class="swap-controls">
        <BalanceCard />
        <Swap />
    </div>
</template>
<style lang="scss" scoped>
.swap-controls {
    flex: 1 1 auto;
    width: 50%;
    @include flex($flex-direction: column);

    @media screen and(max-width:1350px) {
        padding: 0 10px;
        width: 100%;
    }
    @media screen and(min-width:769px) {
        :deep(.balance-card) {
            max-width: 600px;
            width: 100%;
            margin-bottom: 30px;
        }
    }
    @media screen and(max-width:425px) {
        :deep(.balance-card) {
            margin-bottom: 60px;
        }
    }
}
</style>
