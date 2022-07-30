<script lang="ts" setup>
import { useStore } from "vuex";
import ProfileCard from "@components/user/profile-card.vue";
import NotificationCard from "@components/user/notification-card.vue";
const store = useStore();
</script>

<template>
    <header class="header">
        <div class="header__burger" @click="store.commit('toggleBurgerMenu')">
            <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 12V10.5H18V12H0ZM0 6.75V5.25H18V6.75H0ZM0 1.5V0H18V1.5H0Z"
                    fill="white"
                />
            </svg>
        </div>
        <div class="header__panel">
            <NotificationCard />
            <ProfileCard />
        </div>
    </header>
</template>
<style lang="scss" scoped src="./header-mobile.scss"></style>
