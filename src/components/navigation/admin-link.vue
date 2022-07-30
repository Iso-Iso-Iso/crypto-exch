<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useStore } from "vuex";

const props = defineProps({
    to: {
        type: Object,
        required: true,
    },
});
const { to } = toRefs(props);
const store = useStore();
const isUserHaveAdminAccess = computed(
    () => store.getters.isUserHaveAdminAccess
);
</script>

<template>
    <RouterLink v-if="isUserHaveAdminAccess" :to="to">
        <slot></slot>
    </RouterLink>
</template>
