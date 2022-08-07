<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { registerUser } from "@services/auth";
import useAsyncQuery from "@composables/useAsyncQuery";
import useUserLogin from "@composables/useUserLogin";
import LoadSpinner from "@components/ui/load-spinner.vue";
import ErrorText from "@/components/ui/error-text.vue";
import { useRouter } from "vue-router";
import useHideRegisterForm from "@/composables/useHideRegisterForm";
useHideRegisterForm();

const { loginUser } = useUserLogin();

const store = useStore();
const userConfig = reactive({
    login: "",
    password: "",
    country: "",
    city: "",
});
const router = useRouter();

const user = computed(() => store.state.user);
const { doAsyncQuery, errorResponse, isError } = useAsyncQuery(
    registerUser,
    async () => {
        await loginUser(userConfig);
        store.dispatch("getUser");
        store.dispatch("fetchCurrencies");
        router.push({ name: "home-page" });
    }
);
store.commit("hideLoginPopup");

const isShowRegisterForm = computed(
    () => store.state.styles.isRegisterFormActive
);

function sendForm() {
    doAsyncQuery([userConfig]);
}
const isAvailableForRegistration = computed(() => {
    const isAvailableForRegistration =
        userConfig.login.length >= 3 && userConfig.password.length >= 8;
    return isAvailableForRegistration;
});
</script>

<template>
    <div v-if="isShowRegisterForm" class="registration">
        <div
            class="registration__close"
            @click="store.commit('hideRegisterForm')"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="wite"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
            >
                <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
            </svg>
        </div>
        <h2 class="registration__title">Registration</h2>

        <p v-if="isError" class="registration__error">
            {{ errorResponse?.response?.data?.error?.message }}
        </p>
        <label class="registration__label" for="username"
            >Login* (3 symbol+)</label
        >
        <input
            v-model="userConfig.login"
            class="registration__input"
            type="text"
            name="username"
            placeholder="Логин пользователя"
        />
        <label class="registration__label" for="pass"
            >Password* (8 symbol +)</label
        >
        <div class="registration__password">
            <input
                v-model="userConfig.password"
                class="registration__input"
                type="password"
                name="pass"
                placeholder="Пароль пользователя"
            />
            <!-- <div class="registration__show-pass">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_309_3065)">
                        <path
                            d="M10.6261 9.02935C10.7406 8.72336 10.7987 8.39915 10.7975 8.07244C10.7975 7.34703 10.5094 6.65133 9.99643 6.13839C9.48349 5.62545 8.78779 5.33728 8.06238 5.33728C7.7397 5.33766 7.41968 5.39572 7.11743 5.50873L7.75936 6.17059C7.85694 6.15498 7.95558 6.14698 8.0544 6.14667C8.56732 6.14559 9.05983 6.34751 9.42438 6.70833C9.78893 7.06914 9.99591 7.55954 10.0001 8.07244C9.99979 8.17126 9.99179 8.26991 9.97619 8.36749L10.6261 9.02935Z"
                            fill="#C7D2D6"
                        />
                        <path
                            d="M14.2543 7.88507C12.9106 5.40109 10.5542 3.89795 7.94667 3.89795C7.23671 3.89962 6.53151 4.01401 5.85742 4.23685L6.49935 4.88277C6.97216 4.76057 7.45833 4.69763 7.94667 4.69537C10.1914 4.69537 12.2328 5.94733 13.4489 8.05651C13.0028 8.83903 12.4114 9.52919 11.7065 10.0899L12.2727 10.6561C13.0885 9.99798 13.766 9.18495 14.2663 8.26384L14.3699 8.07246L14.2543 7.88507Z"
                            fill="#C7D2D6"
                        />
                        <path
                            d="M2.52429 3.20016L4.30254 4.97841C3.17854 5.70212 2.2599 6.70315 1.63516 7.88502L1.53149 8.07242L1.63516 8.2638C2.97882 10.7478 5.3352 12.2509 7.94278 12.2509C8.96055 12.2507 9.96511 12.0204 10.8813 11.5771L12.8748 13.5707L13.5726 12.9726L3.20608 2.60608L2.52429 3.20016ZM6.41173 7.0876L9.06316 9.73903C8.76358 9.92447 8.4187 10.0238 8.06638 10.0261C7.81038 10.0261 7.5569 9.97549 7.32054 9.87716C7.08418 9.77884 6.86959 9.63474 6.68913 9.45316C6.50866 9.27159 6.36589 9.05612 6.26901 8.81916C6.17214 8.58219 6.12308 8.32841 6.12465 8.07242C6.12915 7.72417 6.22839 7.38372 6.41173 7.0876ZM5.83359 6.50947C5.46057 7.03553 5.28573 7.67661 5.34003 8.31921C5.39433 8.96181 5.67427 9.56447 6.13028 10.0205C6.58628 10.4765 7.18894 10.7564 7.83154 10.8107C8.47414 10.865 9.11523 10.6902 9.64129 10.3172L10.2792 10.9551C9.54073 11.2708 8.74592 11.4335 7.94278 11.4336C5.69803 11.4336 3.65663 10.1816 2.44056 8.07242C3.02415 7.03904 3.86465 6.17383 4.88067 5.56053L5.83359 6.50947Z"
                            fill="#C7D2D6"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_309_3065">
                            <rect
                                x="0.58252"
                                y="0.89563"
                                width="14.3536"
                                height="14.3536"
                                rx="7.17681"
                                fill="white"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </div> -->
        </div>
        <label class="registration__label" for="username">Country</label>
        <input
            v-model="userConfig.country"
            class="registration__input"
            type="text"
            name="username"
            placeholder="Страна пользователя"
        />
        <label class="registration__label" for="username">City</label>
        <input
            v-model="userConfig.city"
            class="registration__input"
            type="text"
            name="username"
            placeholder="Страна пользователя"
        />
        <LoadSpinner v-if="user.isLoading"></LoadSpinner>
        <button
            v-if="user.isError"
            class="registration__sign-in"
            :disabled="!isAvailableForRegistration"
            @click="sendForm()"
        >
            Register
        </button>
        <ErrorText v-if="user.isSuccess">You already have registered</ErrorText>
    </div>
</template>
<style lang="scss" src="./registration-form.scss"></style>
