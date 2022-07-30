import { useStore } from "vuex";

export default function useHideBurger() {
    const store = useStore();

    document.addEventListener("click", (e) => {
        const parentSideBarWrapper = (e.target as HTMLDivElement).closest(
            "#navigation-side-bar"
        );
        const burgerBtn = (e.target as HTMLDivElement).closest(
            ".header__burger"
        );

        if (!parentSideBarWrapper && !burgerBtn) store.commit("hideBurgerMenu");
    });
}
