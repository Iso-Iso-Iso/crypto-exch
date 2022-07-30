<script setup lang="ts">
import BalanceCard from "@components/user/balance-card.vue";
import InfoCard from "@components/user/info-card.vue";
import SecurityCard from "@components/user/security-card.vue";
import TransactionCard from "@components/user/transaction-card.vue";
import UserCardsGrid from "@layouts/user-cards-grid.vue";
</script>

<template>
    <UserCardsGrid>
        <BalanceCard></BalanceCard>
        <InfoCard></InfoCard>
        <SecurityCard></SecurityCard>
        <TransactionCard></TransactionCard>
    </UserCardsGrid>
</template>
