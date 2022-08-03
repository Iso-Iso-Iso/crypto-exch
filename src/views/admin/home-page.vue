<script lang="ts" setup>
import ContentCard from "@components/ui/content-card.vue";
import AdminLink from "@components/navigation/admin-link.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const isUserHaveAdminAccess = computed(
    () => store.getters.isUserHaveAdminAccess
);
const isUserLoading = computed(() => store.state.user.isLoading);
</script>

<template>
    <div class="admin-page">
        <ContentCard v-if="isUserHaveAdminAccess" class="mb-medium admin-menu">
            <AdminLink class="mr-small" :to="{ name: 'admin.deposit' }"
                >Депозиты</AdminLink
            >
            <AdminLink class="mr-small" :to="{ name: 'admin.transaction' }"
                >Выводы</AdminLink
            >
            <AdminLink class="mr-small" :to="{ name: 'admin.currencies' }"
                >Валюты</AdminLink
            >
            <AdminLink :to="{ name: 'admin.settings' }">Настройки</AdminLink>
        </ContentCard>
        <div v-if="isUserLoading">Loading...</div>
        <RouterView v-else-if="isUserHaveAdminAccess"></RouterView>
    </div>
</template>
<style lang="scss">
.admin-page {
    width: 100%;
    @include flex($flex-direction: column);
}
</style>
