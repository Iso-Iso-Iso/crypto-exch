<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import useAsyncQuery from "@/composables/useAsyncQuery";
import { confirmEmail } from "@/services/user";
import LoadSpinner from "@/components/ui/load-spinner.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import ErrorText from "@/components/ui/error-text.vue";
import AlertToast from "@/components/ui/alert-toast.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const token = route.params.token;
const isUserAccountActive = computed(
    () => store.state?.user?.data?.is_verified
);
if (isUserAccountActive.value) router.push("/");
const { doAsyncQuery, isLoading, isError, isSuccess } = useAsyncQuery(
    confirmEmail,
    () => {
        store.dispatch("getUser");
        router.push("/");
    }
);

doAsyncQuery([{ token }]);
</script>
<template>
    <div class="recovery-mail">
        <AlertToast v-if="isSuccess"> Email was confirmed</AlertToast>
        <LoadSpinner v-if="isLoading" /><ErrorText v-else-if="isError"
            >Something went wrong, please contact to support.</ErrorText
        >
    </div>
</template>
<style lang="scss">
.recovery-mail {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0 60px 0;
    background: #0d0d0d;
    border-radius: 20px;
}
</style>
