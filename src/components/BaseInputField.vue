<script setup>
    const props = defineProps({
        id: String,
        label: String,
        required: Boolean,
        valid: Boolean,
    })
</script>
<template>
    <div class="input-field-container">
        <label :for="props.id"
            >{{ props.label }}{{ props.required ? '*' : '(optional)' }}</label
        >
        <div class="input" :class="{ invalid: props.valid === false }">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="css">
    .input-field-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;
    }

    .input-field-container .input {
        border: none;
        border-radius: 5px;
        background-color: var(--color-background-2);
        border: 1px solid transparent;
        padding: 15px 10px;
        box-sizing: border-box;
        width: 100%;
        box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.01);
    }

    .input-field-container .input.invalid {
        border: 1px solid var(--color-primary);
    }

    .input-field-container .input input,
    .input-field-container .input select,
    .input-field-container .input textarea {
        border: 0;
        background-color: transparent;
        width: 100%;
        font-family: var(--font-2);
        font-size: 14px;
    }

    .input-field-container .input textarea {
        min-height: 100px;
    }

    .input-field-container .input input:focus,
    .input-field-container .input select:focus,
    .input-field-container .input textarea:focus {
        outline: none;
    }

    .input-field-container label {
        font-family: var(--font-2);
        font-weight: var(--font-weight-semi-bold);
        font-size: 14px;
    }

    @media (max-width: 767px) {
        .input-field-container label {
            font-size: 14px;
        }

        .input-field-container .input input,
        .input-field-container .input select,
        .input-field-container .input textarea {
            font-size: 12px;
        }
    }
</style>
