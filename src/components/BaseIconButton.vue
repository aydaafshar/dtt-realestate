<script setup lang="js">
const props = defineProps({
    icon: String,
    size: String,
    variant: String
})

const emit = defineEmits(['click'])

</script>

<template>
    <button class="icon-button" :class="props.variant" @click="emit('click')">
        <font-awesome-icon :icon="props.icon" :size="props.size" />
    </button>

</template>

<style lang="css">
.icon-button {
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
}

.icon-button.primary {
    color: var(--color-primary)
}

.icon-button.secondary {
    color: var(--color-seconadry)
}
</style>