<template>
    <div class="order-wrapper">
        <div class="order">
            <div class="order__top">
                <p class="order__name reciever">TYPE</p>
                <p class="order__name date">DATE</p>
                <p class="order__name amount">AMOUNT</p>
                <p class="order__name status">STATUS</p>
            </div>
            <div class="order__bottom">
                <slot></slot>
                <!-- <div class="order__client">
                    <div class="order__reciever reciever">Mohamad Benar</div>
                    <div class="order__date date">Jun 22, 2022</div>
                    <div class="order__amount amount">$15</div>
                    <div class="order__status status">
                        <div class="order__pending">Pending</div>
                    </div>
                </div>
                <div class="order__client">
                    <div class="order__reciever reciever">Mohamad Benar</div>
                    <div class="order__date date">Jun 22, 2022</div>
                    <div class="order__amount amount">$15</div>
                    <div class="order__status status">
                        <div class="order__completed">Completed</div>
                    </div>
                </div>
                <div class="order__client">
                    <div class="order__reciever reciever">Mohamad Benar</div>
                    <div class="order__date date">Jun 22, 2022</div>
                    <div class="order__amount amount">$15</div>
                    <div class="order__status status">
                        <div class="order__canceled">Canceled</div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss" src="./notification-grid.scss"></style>
