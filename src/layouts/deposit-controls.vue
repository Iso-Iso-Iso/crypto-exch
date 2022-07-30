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
    @include flex($flex-direction: column);
    :deep(.balance-card) {
        max-width: 600px;
        width: 100%;
        margin-bottom: 30px;
    }
    @media screen and(max-width:1350px) {
        padding: 0 10px;
        width: 100%;
    }
}
</style>
