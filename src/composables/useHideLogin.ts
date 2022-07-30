import { useStore } from "vuex";

export default function useHideLogin() {
    const store = useStore();

    document.addEventListener("click", (e) => {
        const parentSideBarWrapper = (e.target as HTMLDivElement).closest(
            "#login-popup"
        );
        const burgerBtn = (e.target as HTMLDivElement).closest(
            ".header__profile"
        );

        if (!parentSideBarWrapper && !burgerBtn) store.commit("hideLoginPopup");
    });
}
