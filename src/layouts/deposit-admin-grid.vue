<template>
    <div class="deposit-admin">
        <h2 class="title text-center mb-small"><slot name="title"></slot></h2>
        <div class="deposit-admin__top">
            <p class="deposit-admin__name reciever">RECEIVER</p>
            <p class="deposit-admin__name reciever">NAME</p>
            <p class="deposit-admin__name date">DATE</p>
            <p class="deposit-admin__name amount">AMOUNT</p>
            <p class="deposit-admin__name status">STATUS</p>
        </div>
        <div class="deposit-admin__bottom">
            <slot></slot>
            <!-- <div class="deposit-admin__client">
                <div class="deposit-admin__reciever reciever">
                    Mohamad Benar
                </div>
                <div class="deposit-admin__buttons">
                    <button class="deposit-admin__accept">Accept</button>
                    <button class="deposit-admin__decline">Decline</button>
                </div>
                <div class="deposit-admin__amount amount">$15</div>
                <div class="deposit-admin__status status">
                    <div class="deposit-admin__pending">Pending</div>
                </div>
            </div>
            <div class="deposit-admin__client">
                <div class="deposit-admin__reciever reciever">
                    Mohamad Benar
                </div>
                <div class="deposit-admin__buttons">
                    <button class="deposit-admin__accept">Accept</button>
                    <button class="deposit-admin__decline">Decline</button>
                </div>
                <div class="deposit-admin__amount amount">$15</div>
                <div class="deposit-admin__status status">
                    <div class="order__completed">Completed</div>
                </div>
            </div>
            <div class="deposit-admin__client">
                <div class="deposit-admin__reciever reciever">
                    Mohamad Benar
                </div>
                <div class="deposit-admin__buttons">
                    <button class="deposit-admin__accept">Accept</button>
                    <button class="deposit-admin__decline">Decline</button>
                </div>
                <div class="deposit-admin__amount amount">$15</div>
                <div class="deposit-admin__status status">
                    <div class="order__canceled">Canceled</div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<style lang="scss" src="./deposit-admin-grid.scss"></style>
