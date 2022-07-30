interface StylesState {
    isBurgerMenuActive: boolean;
    isLoginPopupActive: boolean;
}

const styles = {
    state: () => ({
        isBurgerMenuActive: false,
        isLoginPopupActive: false,
    }),
    mutations: {
        toggleBurgerMenu(state: StylesState) {
            state.isBurgerMenuActive = !state.isBurgerMenuActive;
        },
        hideBurgerMenu(state: StylesState) {
            state.isBurgerMenuActive = false;
        },
        toggleLoginPopup(state: StylesState) {
            state.isLoginPopupActive = !state.isLoginPopupActive;
        },
        hideLoginPopup(state: StylesState) {
            state.isLoginPopupActive = false;
        },
    },
};

export default styles;
