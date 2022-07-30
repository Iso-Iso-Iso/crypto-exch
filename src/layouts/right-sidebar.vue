<script setup lang="ts">
import ProfileCard from "@components/user/profile-card.vue";
import NotificationCard from "@components/user/notification-card.vue";
</script>
<template>
    <div>
        <div class="right-sidebar">
            <div class="right-sidebar__top">
                <NotificationCard />
                <ProfileCard />
            </div>
            <div class="right-sidebar__bottom">
                <div href="" class="right-sidebar__pay">
                    <img src="@assets/pay-services.png" alt="" />
                    <h2 class="right-sidebar__title">Pay Services</h2>
                </div>
                <div href="" class="right-sidebar__mobile">
                    <img src="@assets/mobile-recharge.png" alt="" />
                    <h2 class="right-sidebar__title">Mobile Recharge</h2>
                </div>
                <div href="" class="right-sidebar__wpayme">
                    <img src="@assets/wpayme-card.png" alt="" />
                    <h2 class="right-sidebar__title">WPayme Card</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./right-sidebar.scss" lang="scss" scoped></style>
