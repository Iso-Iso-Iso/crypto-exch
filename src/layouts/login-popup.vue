<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import useHideLogin from "@composables/useHideLogin";
import useUserLogin from "@composables/useUserLogin";
import ErrorText from "@/components/ui/error-text.vue";
import LoadSpinner from "@/components/ui/load-spinner.vue";
import useUserProgressState from "@/composables/useUserProgressState";
import { useRouter } from "vue-router";
useHideLogin();
const store = useStore();
const onSuccessLogin = () => {
    store.commit("hideLoginPopup");
    store.dispatch("getUser");
    store.dispatch("fetchCurrencies");
};
const isLoginPopupActive = computed(
    () => store.state.styles.isLoginPopupActive
);
const { loginUser, isError, isLoading, isSuccess } = useUserLogin();

const isShowPassword = ref(false);

const userConfig = reactive({
    email: "",
    password: "",
});
function showRegisterForm() {
    store.commit("hideLoginPopup");
    store.commit("toggleRegisterForm");
}
const { isUserSuccess } = useUserProgressState();
const router = useRouter();
if (isUserSuccess.value) router.push("/");
watch(isUserSuccess, () => router.push("/"));
</script>
<template>
    <Transition name="popup">
        <div
            v-if="isLoginPopupActive"
            id="login-popup"
            :class="{ login_active: isLoginPopupActive }"
            class="login"
        >
            <div class="login__close" @click="store.commit('hideLoginPopup')">
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
            <h2 class="login__title">Login</h2>
            <label class="login__label" for="username">Username</label>
            <input
                v-model="userConfig.email"
                class="login__input"
                type="text"
                name="username"
                placeholder="username"
            />
            <label class="login__label" for="pass">Password</label>
            <div class="login__password">
                <input
                    v-model="userConfig.password"
                    class="login__input"
                    :type="isShowPassword ? 'text' : 'password'"
                    name="pass"
                    placeholder="Password"
                />
                <div
                    class="login__show-pass"
                    @click="isShowPassword = !isShowPassword"
                >
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
                </div>
            </div>
            <RouterLink :to="{ name: 'reset/email-form' }" class="login__forgot"
                >Forgot Password?</RouterLink
            >
            <ErrorText v-if="isError" class="mb-small"
                >Username or password is incorrect</ErrorText
            >

            <LoadSpinner v-if="isLoading" class="mb-small"></LoadSpinner>
            <button
                v-show="(isError || !isSuccess) && !isLoading"
                class="login__sign-in"
                @click="() => loginUser(userConfig, onSuccessLogin)"
            >
                Sign in
            </button>
            <!-- <p class="login__text">or continue with</p>
        <div class="login__socials">
            <a href="" class="login__social">
                <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21.754 9.23922H20.8869V9.19454H11.1984V13.5006H17.2822C16.3947 16.0072 14.0097 17.8066 11.1984 17.8066C7.63139 17.8066 4.73936 14.9145 4.73936 11.3476C4.73936 7.78056 7.63139 4.88853 11.1984 4.88853C12.8449 4.88853 14.3428 5.50967 15.4834 6.52428L18.5283 3.47939C16.6057 1.68755 14.0339 0.58252 11.1984 0.58252C5.25339 0.58252 0.43335 5.40256 0.43335 11.3476C0.43335 17.2925 5.25339 22.1126 11.1984 22.1126C17.1434 22.1126 21.9634 17.2925 21.9634 11.3476C21.9634 10.6258 21.8891 9.92118 21.754 9.23922Z"
                        fill="#FFC107"
                    />
                    <path
                        d="M1.67383 6.33697L5.21068 8.9308C6.16769 6.56142 8.4854 4.88853 11.1977 4.88853C12.8442 4.88853 14.3421 5.50967 15.4827 6.52428L18.5276 3.47939C16.6049 1.68755 14.0332 0.58252 11.1977 0.58252C7.0628 0.58252 3.47697 2.91692 1.67383 6.33697Z"
                        fill="#FF3D00"
                    />
                    <path
                        d="M11.1986 22.113C13.9792 22.113 16.5057 21.0489 18.416 19.3184L15.0842 16.499C13.9671 17.3486 12.602 17.8081 11.1986 17.807C8.39857 17.807 6.02112 16.0216 5.12547 13.53L1.61499 16.2347C3.3966 19.721 7.01473 22.113 11.1986 22.113Z"
                        fill="#4CAF50"
                    />
                    <path
                        d="M21.754 9.23926H20.8869V9.19458H11.1984V13.5006H17.2822C16.8577 14.6936 16.0929 15.736 15.0824 16.4992L15.084 16.4981L18.4158 19.3175C18.18 19.5317 21.9634 16.7301 21.9634 11.3476C21.9634 10.6258 21.8891 9.92122 21.754 9.23926Z"
                        fill="#1976D2"
                    />
                </svg>
            </a>
            <a href="" class="login__social">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.1912 0.58252C5.24346 0.58252 0.426025 5.39995 0.426025 11.3477C0.426025 16.1113 3.50757 20.1348 7.78674 21.5612C8.325 21.6554 8.52685 21.3325 8.52685 21.0499C8.52685 20.7942 8.5134 19.9465 8.5134 19.0449C5.80863 19.5428 5.1089 18.3855 4.89359 17.78C4.77248 17.4705 4.24768 16.515 3.79016 16.2594C3.41337 16.0575 2.87511 15.5596 3.7767 15.5462C4.62446 15.5327 5.23 16.3267 5.43185 16.6496C6.40072 18.2778 7.94822 17.8203 8.56722 17.5377C8.66142 16.838 8.944 16.367 9.2535 16.0979C6.85824 15.8288 4.35533 14.9003 4.35533 10.7826C4.35533 9.61185 4.77248 8.64298 5.45876 7.88941C5.35111 7.62028 4.97433 6.51685 5.56642 5.03663C5.56642 5.03663 6.468 4.75404 8.52685 6.14006C9.38807 5.89785 10.3031 5.77674 11.2182 5.77674C12.1332 5.77674 13.0482 5.89785 13.9095 6.14006C15.9683 4.74059 16.8699 5.03663 16.8699 5.03663C17.462 6.51685 17.0852 7.62028 16.9775 7.88941C17.6638 8.64298 18.081 9.59839 18.081 10.7826C18.081 14.9137 15.5646 15.8288 13.1694 16.0979C13.5596 16.4343 13.896 17.0802 13.896 18.0895C13.896 19.5293 13.8825 20.6866 13.8825 21.0499C13.8825 21.3325 14.0844 21.6689 14.6227 21.5612C16.7597 20.8397 18.6167 19.4662 19.9323 17.6341C21.2479 15.8019 21.9558 13.6033 21.9565 11.3477C21.9565 5.39995 17.139 0.58252 11.1912 0.58252Z"
                        fill="black"
                    />
                </svg>
            </a>
            <a href="" class="login__social">
                <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21.9491 11.4137C21.9491 5.43091 17.129 0.581177 11.1839 0.581177C5.23614 0.582522 0.416016 5.43091 0.416016 11.415C0.416016 16.8205 4.35339 21.3015 9.49917 22.1143V14.545H6.76749V11.415H9.50186V9.02649C9.50186 6.31231 11.1099 4.81325 13.5684 4.81325C14.7472 4.81325 15.9785 5.02452 15.9785 5.02452V7.68891H14.6207C13.2845 7.68891 12.8673 8.52456 12.8673 9.38174V11.4137H15.852L15.3756 14.5437H12.866V22.113C18.0118 21.3002 21.9491 16.8192 21.9491 11.4137Z"
                        fill="#059BE5"
                    />
                </svg>
            </a>
        </div> -->
            <div class="login__register-for-free">
                <p>Don???t have an account yet?</p>
                <button class="login-btn" @click="showRegisterForm()">
                    <p>Register for free</p>
                </button>
            </div>
        </div>
    </Transition>
</template>
<style src="./login-popup.scss" lang="scss" scoped></style>
