<template>
    <div class="recovery-pass">
        <h2 class="recovery-pass__title">Введите новый пароль</h2>
        <h3 class="recovery-pass__sub-title">Новый пароль</h3>
        <div class="recovery-pass__amount">
            <input
                type="password"
                name="new-pass"
                class="recovery-pass__input"
            />
        </div>
        <h3 class="recovery-pass__sub-title">Повторите новый пароль</h3>
        <div class="recovery-pass__amount">
            <input
                type="password"
                name="repeat-new-pass"
                class="recovery-pass__input"
            />
        </div>
        <button class="recovery-pass__button">Отправить</button>
    </div>
</template>
<style lang="scss" src="./password-recovery.scss"></style>
