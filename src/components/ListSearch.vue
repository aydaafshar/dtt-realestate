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
    <div class="list-search-container">
        <font-awesome-icon icon="magnifying-glass" />
        <input type="text" v-model="query" />
        <button v-if="query.length > 0" @click="clear()"><font-awesome-icon icon="circle-xmark" /></button>
    </div>
</template>

<style lang="css" scoped>
.list-search-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
}
</style>