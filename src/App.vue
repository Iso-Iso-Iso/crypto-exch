<script setup lang="ts">
import NavigationSideBar from "@layouts/navigation-side-bar.vue";
import RightSidebar from "@layouts/right-sidebar.vue";
import HeaderMobile from "@components/navigation/header-mobile.vue";
import LoginPopup from "@layouts/login-popup.vue";
import { useStore } from "vuex";

const store = useStore();

// store.dispatch("userLogin", a);
store.dispatch("getUser");
store.dispatch("fetchCurrencies");
store.dispatch("fetchSettings");
</script>

<template>
    <div id="app">
        <LoginPopup />
        <NavigationSideBar />
        <div class="flex-space">
            <HeaderMobile />
            <RouterView />
            <RightSidebar />
        </div>
    </div>
</template>

<style lang="scss" src="@scss/main.scss"></style>
