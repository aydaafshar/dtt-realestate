<script setup lang="js">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useHouses } from '../stores'
import ListSort from '../components/ListSort.vue'
import ListSearch from '../components/ListSearch.vue';
import HouseItem from '../components/HouseItem.vue';
import BaseButton from '../components/BaseButton.vue';


const router = useRouter()
const store = useHouses()


onMounted(() => {
    store.loadMany()
})
</script>


<template>
    <div class="header">
        Houses
        <BaseButton variant="primary" icon="plus" @click="router.push('/house/new')">Create New</BaseButton>
    </div>
    <ListSearch @search="store.search($event)" />
    <p v-if="store.searchCount > 0">{{ store.searchCount }} results found. </p>
    <ListSort :items="['price', 'size']" :selected="store.sortType" @change="store.sort($event)" />
    <div v-for="house in store.houses" :key="house.id">
        <HouseItem :house="house" hasAction />
    </div>
</template>

<style lang="css" scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
