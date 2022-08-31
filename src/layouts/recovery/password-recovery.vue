<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import ErrorText from "@/components/ui/error-text.vue";
import useAsyncQuery from "@/composables/useAsyncQuery";
import { resetPassword } from "@services/auth";
import LoadSpinner from "@/components/ui/load-spinner.vue";
import SuccessText from "@/components/ui/success-text.vue";

const route = useRoute();
const resetConfig = reactive({
    token: route.params.id,
    new_password: "",
});
const secondPassword = ref("");

const { doAsyncQuery, response, errorResponse, isError, isSuccess, isLoading } =
    useAsyncQuery(resetPassword);
async function onPasswordReset() {
    await doAsyncQuery([resetConfig]);
    console.log(response.value, errorResponse.value);
}
</script>
<template>
    <div class="recovery-pass">
        <h2 class="recovery-pass__title">Введите новый пароль</h2>
        <h3 class="recovery-pass__sub-title">Новый пароль</h3>
        <div class="recovery-pass__amount">
            <input
                v-model="resetConfig.new_password"
                type="password"
                name="new-pass"
                class="recovery-pass__input"
            />
        </div>
        <h3 class="recovery-pass__sub-title">Повторите новый пароль</h3>
        <div class="recovery-pass__amount">
            <input
                v-model="secondPassword"
                type="password"
                name="repeat-new-pass"
                class="recovery-pass__input"
            />
        </div>
        <ErrorText v-if="resetConfig.new_password.length < 8">
            password length must be more than 7 characters.</ErrorText
        >

        <ErrorText
            v-else-if="
                secondPassword != resetConfig.new_password ||
                !resetConfig.new_password
            "
        >
            Repeat password correctly
        </ErrorText>
        <LoadSpinner v-else-if="isLoading" />
        <SuccessText v-else-if="isSuccess"
            >Password was reset, please log in with new password</SuccessText
        >
        <button v-else class="recovery-pass__button" @click="onPasswordReset()">
            Отправить
        </button>
    </div>
</template>
<style lang="scss" src="./password-recovery.scss"></style>
