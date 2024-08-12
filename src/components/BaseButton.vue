<script setup lang="js">
const props = defineProps({
    icon: String,
    variant: String,
    disabled:Boolean,
    type: String
})
const emit = defineEmits(['click'])
</script>
<template>
    <button :disabled="props.disabled" :type="props.type" class="button" :class="props.variant" @click="emit('click')">
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
    padding: 10px 15px;
    gap: 5px;
}

button:disabled.button{
   background-color: gray;
}

.button .text {
    flex: 1;
    text-transform: uppercase;
    text-align: center;
}

.button.primary {
    background-color: red;
}

.button.secondary {
    background-color: gray;
}
</style>
