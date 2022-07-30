<script setup lang="ts">
import ContentCard from "@components/ui/content-card.vue";
import IconDots from "@components/icons/icon-dots.vue";
import IconSecurity from "@components/icons/icon-security.vue";
import IconLock from "@components/icons/icon-lock.vue";
import Checkbox from "@components/ui/checkbox.vue";
import { ref } from "vue";

const isDoubleAuthActive = ref(false);
</script>
<template>
    <ContentCard class="security-card">
        <div class="security-card__headers flex-space mb-medium">
            <h2 class="title">Security</h2>
            <button>
                <IconDots />
            </button>
        </div>
        <div class="flex-space mb-small">
            <div class="flex-center">
                <button
                    :class="{ button_active: isDoubleAuthActive }"
                    class="button button_filled mr-small"
                >
                    <IconSecurity />
                </button>
                <p class="standart-text">2X A Enabled</p>
            </div>
            <Checkbox v-model="isDoubleAuthActive" />
        </div>
        <div class="flex-space">
            <div class="flex-center">
                <button class="button button_filled mr-small">
                    <IconLock />
                </button>
                <p class="standart-text">Key</p>
            </div>
            <button class="button button_thin">Change</button>
        </div>
    </ContentCard>
</template>
<style src="./security-card.scss" lang="scss"></style>
