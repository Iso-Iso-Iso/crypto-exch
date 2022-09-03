<script lang="ts" setup>
import { onMounted, onUnmounted, ref, toRefs } from "vue";

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    // status can be NaN, so required = false
    status: {
        type: [Number],
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    currency: { type: String, default: "" },
});

const { type, status, date, sum } = toRefs(props);
const isShowWarning = ref(false);

function onSpaceClick(e: MouseEvent) {
    const targer = e.target as HTMLDivElement;
    const parent = targer.closest(".support-dot-wrapper");
    if (!parent) isShowWarning.value = false;
}

onMounted(() => {
    document.addEventListener("click", onSpaceClick);
});
onUnmounted(() => {
    document.addEventListener("click", onSpaceClick);
});
</script>

<template>
    <div class="payment-history__item">
        <div
            :class="{ 'temporary-frozen': status == 2 }"
            class="payment-history__name"
        >
            <span class="mr-small">
                {{ type }}
            </span>
            <div class="support-dot-wrapper">
                <div
                    v-if="status == 2"
                    class="payment-history__svg"
                    @click="isShowWarning = !isShowWarning"
                >
                    <svg
                        width="7"
                        height="7"
                        viewBox="0 0 7 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.10833 5H3.60833V3H3.10833V5ZM3.33333 2.38333C3.41111 2.38333 3.47639 2.35833 3.52917 2.30833C3.58194 2.25833 3.60833 2.19444 3.60833 2.11667C3.60833 2.03889 3.58194 1.97222 3.52917 1.91667C3.47639 1.86111 3.41111 1.83333 3.33333 1.83333C3.25556 1.83333 3.19028 1.86111 3.1375 1.91667C3.08472 1.97222 3.05833 2.03889 3.05833 2.11667C3.05833 2.19444 3.08472 2.25833 3.1375 2.30833C3.19028 2.35833 3.25556 2.38333 3.33333 2.38333V2.38333ZM3.33333 6.66667C2.87778 6.66667 2.44722 6.57917 2.04167 6.40417C1.63611 6.22917 1.28194 5.99028 0.979167 5.6875C0.676389 5.38472 0.4375 5.03056 0.2625 4.625C0.0875 4.21944 0 3.78611 0 3.325C0 2.86944 0.0875 2.43889 0.2625 2.03333C0.4375 1.62778 0.676389 1.275 0.979167 0.975C1.28194 0.675 1.63611 0.4375 2.04167 0.2625C2.44722 0.0875 2.88056 0 3.34167 0C3.79722 0 4.22778 0.0875 4.63333 0.2625C5.03889 0.4375 5.39167 0.675 5.69167 0.975C5.99167 1.275 6.22917 1.62778 6.40417 2.03333C6.57917 2.43889 6.66667 2.87222 6.66667 3.33333C6.66667 3.78889 6.57917 4.21944 6.40417 4.625C6.22917 5.03056 5.99167 5.38472 5.69167 5.6875C5.39167 5.99028 5.03889 6.22917 4.63333 6.40417C4.22778 6.57917 3.79444 6.66667 3.33333 6.66667ZM3.34167 6.16667C4.125 6.16667 4.79167 5.89028 5.34167 5.3375C5.89167 4.78472 6.16667 4.11389 6.16667 3.325C6.16667 2.54167 5.89167 1.875 5.34167 1.325C4.79167 0.775 4.12222 0.5 3.33333 0.5C2.55 0.5 1.88194 0.775 1.32917 1.325C0.776389 1.875 0.5 2.54444 0.5 3.33333C0.5 4.11667 0.776389 4.78472 1.32917 5.3375C1.88194 5.89028 2.55278 6.16667 3.34167 6.16667Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <a
                    v-if="isShowWarning"
                    href="tg://resolve?domain=wpayme"
                    class="payment-history__info"
                >
                    your withdrawal was temporarily frozen, please contact
                    support to complete verification
                </a>
            </div>
        </div>
        <p class="payment-history__date">{{ date }}</p>
        <p class="payment-history__prise">{{ sum }} {{ currency }}</p>
        <div
            :class="{
                completed: status == 1 || type == 'swap',
                canceled: status == -1,
                frozen: status == 2,
                pending: status == 0,
            }"
            class="payment-history__button"
        >
            <span v-if="status == 1 || type == 'swap'">Completed</span>
            <span v-if="status == 2">Frozen</span>
            <span v-if="status == 0">Pending</span>
            <span v-if="status == -1">Canceled</span>
        </div>
    </div>
</template>
<style lang="scss" scoped src="./notification-item.scss"></style>
