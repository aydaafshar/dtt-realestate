<script setup lang="js">
const props = defineProps({
    items: Array,
    selected: String,
})
const emit = defineEmits(['change'])
</script>
<template>
    <div class="sort">
        <button v-for="item in props.items" @click="emit('change', item)" class="item"
            :class="{ selected: item === props.selected }">
            {{ item }}
        </button>
    </div>
</template>
<style scoped lang="css">
.sort {
    display: flex;
    flex-direction: row;

}

.sort .item {
    border: none;
    background-color: var(--color-quaternary);
    color: var(--color-tertiary);
    padding: 10px 40px;
    cursor: pointer;
    flex: 1;
}

.sort .item:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.sort .item:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.sort .item.selected {
    background-color: var(--color-primary);
}
</style>
