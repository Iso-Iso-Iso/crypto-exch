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
const isUserLoggined = computed(() => store.state.user.isSuccess);
</script>

<template>
    <RouterLink v-if="isUserLoggined" :to="to">
        <slot></slot>
    </RouterLink>
</template>
