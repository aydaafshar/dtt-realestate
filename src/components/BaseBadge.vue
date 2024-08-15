<script setup lang="js">
const props = defineProps({
    icon: String
})
</script>
<template>
    <div class="badge">
        <font-awesome-icon :icon="props.icon" />
        <p>
            <slot></slot>
        </p>
    </div>
</template>

<style lang="css">
.badge {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
    color: var(--color-quaternary)
}

.badge p {
    color: var(--text-secondary);
}
</style>
