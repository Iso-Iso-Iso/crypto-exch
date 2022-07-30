import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export default function useGetCurrentPage() {
    const route = useRoute();
    const currentPage = computed(() => route.query.p || 1);
    return currentPage;
}
