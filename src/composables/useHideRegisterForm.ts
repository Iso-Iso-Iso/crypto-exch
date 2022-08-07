import { useStore } from "vuex";

export default function useHideRegisterForm() {
    const store = useStore();

    document.addEventListener("click", (e) => {
        const parentSideBarWrapper = (e.target as HTMLDivElement).closest(
            ".registration"
        );
        const burgerBtn = (e.target as HTMLDivElement).closest(".login-btn");

        if (!parentSideBarWrapper && !burgerBtn)
            store.commit("hideRegisterForm");
    });
}
