<script setup lang="ts">
import { toRefs } from "vue";

defineEmits(["onAccept", "onDecline", "onFreeze"]);
const props = defineProps({
    username: { type: String, required: true },
    status: { type: Number, required: true },
    sum: { type: Number, required: true },
    card: { type: String, required: true },
});

const { username, status, sum, card } = toRefs(props);
</script>
<template>
    <div class="deposit-admin__client">
        <div class="deposit-admin__reciever reciever">{{ card }}</div>
        <div class="deposit-admin__reciever reciever">{{ username }}</div>
        <div v-if="status == 0 || status == 2" class="deposit-admin__buttons">
            <button @click="$emit('onAccept')" class="deposit-admin__accept">
                Accept
            </button>
            <button @click="$emit('onDecline')" class="deposit-admin__decline">
                Decline
            </button>
            <button
                v-if="status != 2"
                @click="$emit('onFreeze')"
                class="deposit-admin__freeze"
            >
                Freeze
            </button>
        </div>
        <div class="deposit-admin__amount amount">{{ sum }}</div>
        <div v-if="status == 0" class="deposit-admin__status status">
            <div class="deposit-admin__pending">Pending</div>
        </div>
        <div v-if="status == 1" class="deposit-admin__status status">
            <div class="deposit-admin__completed">Completed</div>
        </div>
        <div v-if="status == -1" class="deposit-admin__status status">
            <div class="deposit-admin__canceled">Canceled</div>
        </div>
        <div v-if="status == 2" class="deposit-admin__status status">
            <div class="deposit-admin__freeze">Freezed</div>
        </div>
    </div>
</template>
