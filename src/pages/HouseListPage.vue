<template>
    <div>House List, sorted by {{ store.sortType }}</div>
    <input type="text" v-model="text" @keypress="store.search(text)" />
    <Sort
        :items="['price', 'size']"
        :selected="store.sortType"
        @change="store.sort($event)"
    />
    <div v-for="house in store.houses">
        {{ house.size }} - {{ house.price }}
    </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useHouses } from '../stores'
import Sort from '../components/Sort.vue'

const text = ref()

const store = useHouses()

onMounted(() => {
    store.loadMany()
})
</script>
