<script lang="ts" setup>
import BalanceCard from "@components/user/balance-card.vue";
import Deposit from "@components/deposit/deposit.vue";
</script>
<template>
    <div class="swap-controls">
        <BalanceCard />
        <Deposit />
    </div>
</template>
<style lang="scss" scoped>
.swap-controls {
    flex: 1 1 auto;
    width: 50%;
    margin-bottom: 30px;
    @include flex($flex-direction: column);

    @media screen and(max-width:1350px) {
        padding: 0 10px;
        width: 100%;
    }
    @media screen and(min-width:769px) {
        :deep(.balance-card) {
            max-width: 380px;
            width: 100%;
            margin-bottom: 30px;
        }
    }
    @media screen and(max-width:425px) {
        :deep(.balance-card) {
            margin-bottom: 60px;
        }
        padding: 60px 10px 0;
        justify-content: flex-start;
    }
}
</style>
