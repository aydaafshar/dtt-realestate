<script setup lang="js">
    const props = defineProps({
        icon: String,
        variant: String,
        disabled: Boolean,
        type: String,
    })
    const emit = defineEmits(['click'])
</script>
<template>
    <button
        :disabled="props.disabled"
        :type="props.type"
        class="button"
        :class="props.variant"
        @click="emit('click')"
    >
        <font-awesome-icon v-if="props.icon" :icon="props.icon" />
        <span class="text">
            <slot></slot>
        </span>
    </button>
</template>

<style lang="css">
    .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 25px;
        gap: 8px;
        color: var(--color-tertiary);
        border: none;
        border-radius: 5px;
        cursor: pointer;

        font-family: var(--font-2);
        font-weight: bold;
        font-size: 18px;
    }

    button:disabled.button {
        background-color: gray;
    }

    .button .text {
        flex: 1;
        text-transform: uppercase;
        text-align: center;
    }

    .button.primary {
        background-color: var(--color-primary);
    }

    .button.secondary {
        background-color: var(--color-secondary);
    }
</style>
