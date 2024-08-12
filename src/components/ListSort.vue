<script setup lang="js">
const props = defineProps({
    items: Array,
    selected: String,
})
const emit = defineEmits(['change'])
</script>
<template>
    <div class="sort">
        <button
            v-for="item in props.items"
            @click="emit('change', item)"
            class="item"
            :class="{ selected: item === props.selected }"
        >
            {{ item }}
        </button>
    </div>
</template>
<style scoped lang="css">
.sort {
    display: flex;
    flex-direction: row;
}

.sort .item.selected {
    background-color: red;
}
</style>
