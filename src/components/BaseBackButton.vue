<script setup>
    import { useRouter } from 'vue-router'
    import BaseIconButton from './BaseIconButton.vue'

    const router = useRouter()

    const props = defineProps({
        to: String,
    })

    const goBack = () => {
        if (!props.to) {
            router.back()
        } else {
            router.push(props.to)
        }
    }
</script>
<template>
    <div class="back-button">
        <BaseIconButton size="lg" icon="arrow-left" @click="goBack()" />
        <h3>
            <slot></slot>
        </h3>
    </div>
</template>

<style lang="css" scoped>
    .back-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        padding: 10px 0;
    }

    .back-button h3 {
        font-family: var(--font-2);
        font-weight: var(--font-weight-semi-bold);
        font-size: 16px;
    }
</style>
