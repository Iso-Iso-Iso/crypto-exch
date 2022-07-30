<script lang="ts" setup>
import IconPan from "@components/icons/icon-pen.vue";
import ContentCard from "@components/ui/content-card.vue";
import IconLocation from "@components/icons/icon-location.vue";
import IconAddress from "@components/icons/icon-address.vue";
import IconWallet from "@components/icons/icon-wallet.vue";
import TextLoadPlaceholder from "@components/ui/text-load-placeholder.vue";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const user = computed(() => store.state.user);
</script>
<template>
    <ContentCard class="info-card">
        <div class="info-card__header flex-space">
            <h2 class="title">Information</h2>
            <button class="button"><IconPan /></button>
        </div>
        <div class="info-card__info-wrapper">
            <div class="info-card__item">
                <IconLocation />
                <p class="info-card__key">Location:</p>
                <p class="info-card__value">
                    <TextLoadPlaceholder
                        :loading="user.isLoading"
                        :error="user.isError"
                    >
                        {{ user.data.country }}
                        <template #error>India</template>
                    </TextLoadPlaceholder>
                </p>
            </div>
            <div class="info-card__item">
                <IconAddress />
                <p class="info-card__key">Address:</p>
                <p class="info-card__value">
                    <TextLoadPlaceholder
                        :loading="user.isLoading"
                        :error="user.isError"
                    >
                        {{ user.data.city }}
                        <template #error>India</template>
                    </TextLoadPlaceholder>
                </p>
            </div>
            <div class="info-card__item">
                <IconWallet />
                <p class="info-card__key">Wallet ID:</p>
                <p class="info-card__value">6HE46URR677wSR446Ic</p>
            </div>
        </div>
    </ContentCard>
</template>

<style lang="scss" src="./info-card.scss"></style>
