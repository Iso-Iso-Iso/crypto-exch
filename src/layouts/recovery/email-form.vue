<script lang="ts" setup>
import useAsyncQuery from "@/composables/useAsyncQuery";
import { sendMailForPasswordReset } from "@/services/auth";
import { ref } from "vue";
import ErrorText from "@/components/ui/error-text.vue";
import SuccessText from "@/components/ui/success-text.vue";
import LoadSpinner from "@/components/ui/load-spinner.vue";
import { useStore } from "vuex";

const { doAsyncQuery, isError, errorResponse, isSuccess, isLoading } =
    useAsyncQuery(sendMailForPasswordReset);
const userMail = ref("");

function onMailSend() {
    doAsyncQuery([
        {
            email: userMail.value,
        },
    ]);
}
const store = useStore();
store.commit("hideLoginPopup");
</script>
<template>
    <form class="recovery-mail">
        <h2 class="recovery-mail__title">Восстановление пароля</h2>
        <h3 class="recovery-mail__sub-title">
            Введите почту на которую будут высланы инструкции <br />
            по восстановлению пароля
        </h3>
        <div class="recovery-mail__amount">
            <input
                v-model="userMail"
                type="email"
                name="mail"
                class="recovery-mail__input"
                placeholder="example@gmail.com"
            />
        </div>
        <ErrorText v-if="isError">Something went wrong</ErrorText>
        <SuccessText v-else-if="isSuccess"
            >Letter was send for mail. Check your mail.</SuccessText
        >

        <LoadSpinner v-else-if="isLoading" />
        <button v-else class="recovery-mail__button" @click="onMailSend()">
            Отправить
        </button>
    </form>
</template>
<style lang="scss" src="./email-form.scss"></style>
