<script lang="ts" setup>
import PrimaryLogo from "@components/ui/primary-logo.vue";
import SideBarLink from "@components/ui/side-bar-link.vue";
import IconHome from "@components/icons/icon-home.vue";
import IconDeposit from "@components/icons/icon-deposit.vue";
import IconSwap from "@components/icons/icon-swap.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import useHideBurger from "@composables/useHideBurge";
import UserLink from "@components/navigation/user-link.vue";
const store = useStore();
useHideBurger();
const isBurgerMenuActive = computed(
    () => store.state.styles.isBurgerMenuActive
);
</script>

<template>
    <div
        id="navigation-side-bar"
        :class="{ 'side-bar_active': isBurgerMenuActive }"
        class="side-bar"
    >
        <div class="padding">
            <PrimaryLogo />
        </div>

        <AdminLink :to="{ name: 'admin-home-page' }">
            <SideBarLink><IconHome /> Admin</SideBarLink>
        </AdminLink>
        <RouterLink :to="{ name: 'home-page' }">
            <SideBarLink><IconHome /> Home</SideBarLink>
        </RouterLink>
        <RouterLink :to="{ name: 'deposit-page' }">
            <SideBarLink><IconDeposit /> Deposit-Withdraw</SideBarLink>
        </RouterLink>
        <RouterLink :to="{ name: 'swap-page' }">
            <SideBarLink><IconSwap /> Swap</SideBarLink></RouterLink
        >
    </div>
</template>

<style lang="scss" scoped src="./navigation-side-bar.scss"></style>
