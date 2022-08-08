<script setup lang="ts">
import useGetCurrentPage from "@composables/useGetCurrentPage";
import { ref, toRefs } from "vue";

const currentPage = useGetCurrentPage();

const props = defineProps({
    maxPage: Number,
    pageName: String,
});
const { maxPage, pageName } = toRefs(props);
//TODO fix any
const pageBullets = ref<number[]>([]);
for (let i = +currentPage.value - 2; i < +currentPage.value + 3; i++) {
    if (i < 1) continue;
    if (i > (maxPage!.value as any)) continue;
    pageBullets.value.push(i);
}
</script>

<template>
    <div v-if="(maxPage || 0) > 1" class="admin-pagination">
        <RouterLink
            v-if="currentPage != 1"
            :to="{ name: pageName, query: { p: +currentPage - 1 } }"
            ><svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.05977 11.78C6.18644 11.78 6.31311 11.7333 6.41311 11.6333C6.60644 11.44 6.60644 11.12 6.41311 10.9267L2.06644 6.58001C1.74644 6.26001 1.74644 5.74001 2.06644 5.42001L6.41311 1.07335C6.60644 0.880013 6.60644 0.560013 6.41311 0.36668C6.21977 0.173346 5.89977 0.173346 5.70644 0.36668L1.35977 4.71335C1.01977 5.05335 0.826439 5.51335 0.826439 6.00001C0.826439 6.48668 1.01311 6.94668 1.35977 7.28668L5.70644 11.6333C5.80644 11.7267 5.93311 11.78 6.05977 11.78Z"
                    fill="#F7F9FF"
                />
            </svg>
        </RouterLink>
        <RouterLink
            v-for="(item, index) of pageBullets"
            :key="index"
            :class="{ 'active-paginate-bullet': currentPage == item }"
            :to="{ name: pageName, query: { p: item } }"
            >{{ item }}</RouterLink
        >
        <!-- <a href="">1</a>
        <a href="">2</a>
        <a href="">3</a> -->
        <RouterLink
            v-if="currentPage != maxPage"
            :to="{ name: pageName, query: { p: +currentPage + 1 } }"
            ><svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0.940228 11.78C0.813561 11.78 0.686895 11.7333 0.586895 11.6333C0.393561 11.44 0.393561 11.12 0.586895 10.9267L4.93356 6.58001C5.25356 6.26001 5.25356 5.74001 4.93356 5.42001L0.586895 1.07335C0.393561 0.880013 0.393561 0.560013 0.586895 0.36668C0.780228 0.173346 1.10023 0.173346 1.29356 0.36668L5.64023 4.71335C5.98023 5.05335 6.17356 5.51335 6.17356 6.00001C6.17356 6.48668 5.98689 6.94668 5.64023 7.28668L1.29356 11.6333C1.19356 11.7267 1.06689 11.78 0.940228 11.78Z"
                    fill="#F7F9FF"
                />
            </svg>
        </RouterLink>
    </div>
</template>
<style lang="scss">
%triggered-paginate-link {
    opacity: 1;
    background: #bfb5ff;
    border: 1px solid #bfb5ff;
}

.admin-pagination {
    height: 26px;
    max-width: fit-content;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    position: absolute;
    left: 100%;
    transform: translateX(calc(-100% - 30px));
    bottom: 20px;
    a {
        width: 26px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f6f9ff;
        background: #141535;
        border-radius: 4px;
        transition: 0.4s all ease;
        &:hover {
            background: #5359ea;
        }
    }
    @media screen and (max-width: 720px) {
        right: 50px;
    }
    @media screen and (max-width: 420px) {
        right: 20px;
    }
}
.active-paginate-bullet {
    background: #5359ea !important;
}
</style>
