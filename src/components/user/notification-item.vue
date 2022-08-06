<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    // status can be NaN, so required = false
    status: {
        type: [Number],
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
});
const { type, status, date, sum } = toRefs(props);
</script>

<template>
    <div class="order__client">
        <div class="order__reciever reciever">{{ type }}</div>
        <div class="order__date date">{{ date }}</div>
        <div class="order__amount amount">{{ sum }}</div>
        <div class="order__status status">
            <div v-if="status == 0" class="order__pending">Pending</div>
            <div v-if="status == 1" class="order__completed">Completed</div>
            <div v-if="status == -1" class="order__canceled">Canceled</div>
            <div v-if="status == 2" class="order__freeze">Freezed</div>
        </div>
    </div>
</template>
