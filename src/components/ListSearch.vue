<script setup lang="js">
import { ref, watch } from 'vue';


const query = ref('')
const emit = defineEmits(['search'])

const clear = () => {
    query.value = ''
}

watch(query, (value) => emit('search', value))


</script>
<template>
    <div class="search">
        <font-awesome-icon class="icon" icon="magnifying-glass" />
        <input type="text" placeholder="Search for a house" v-model="query" />
        <button v-if="query.length > 0" @click="clear()"><font-awesome-icon icon="circle-xmark" /></button>
    </div>
</template>

<style lang="css" scoped>
.search {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    border-radius: 8px;
    padding: 10px 20px;
    gap: 10px;
    background-color: var(--color-tertiary);

}

.search input {
    background-color: transparent;
    border: none;
    flex: 1;
}

.search button {
    background: transparent;
    border: none;
}

.search .icon {
    color: var(--color-quaternary)
}

.search input:focus {
    outline: none;
}
</style>