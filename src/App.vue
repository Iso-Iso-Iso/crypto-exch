<script setup lang="ts">
import NavigationSideBar from "@layouts/navigation-side-bar.vue";
import RightSidebar from "@layouts/right-sidebar.vue";
import HeaderMobile from "@components/navigation/header-mobile.vue";
import LoginPopup from "@layouts/login-popup.vue";
import { useStore } from "vuex";
// import { loginUser } from "@/services/auth";
// const a = { login: "admin", password: "qwerty123" };
// loginUser(a).then((res) => console.log(res));
const store = useStore();

// store.dispatch("userLogin", a);
store.dispatch("getUser");
store.dispatch("fetchCurrencies");
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
