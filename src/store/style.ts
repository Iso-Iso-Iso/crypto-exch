interface StylesState {
    isBurgerMenuActive: boolean;
    isLoginPopupActive: boolean;
    isRegisterFormActive: boolean;
}

const styles = {
    state: () => ({
        isBurgerMenuActive: false,
        isLoginPopupActive: false,
        isRegisterFormActive: false,
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
        toggleRegisterForm(state: StylesState) {
            state.isRegisterFormActive = !state.isRegisterFormActive;
        },
        hideRegisterForm(state: StylesState) {
            state.isRegisterFormActive = false;
        },
    },
};

export default styles;
