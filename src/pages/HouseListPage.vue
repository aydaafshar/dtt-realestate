<script setup lang="js">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useHouses } from '../stores'
import ListSort from '../components/ListSort.vue'
import ListSearch from '../components/ListSearch.vue';
import HouseItem from '../components/HouseItem.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseIconButton from '../components/BaseIconButton.vue';


const router = useRouter()
const store = useHouses()


onMounted(() => {
    store.loadMany()
})
</script>


<template>
    <div class="page">

        <div class="header">
            <h3>Houses</h3>
            <BaseButton variant="primary" icon="plus" @click="router.push('/house/new')">Create New</BaseButton>
            <BaseIconButton icon="plus" size="2x" @click="router.push('/house/new')" />
        </div>
        <div class="toolbar">
            <ListSearch @search="store.search($event)" />
            <ListSort :items="['price', 'size']" :selected="store.sortType" @change="store.sort($event)" />
        </div>
        <p v-if="store.searchCount > 0">{{ store.searchCount }} results found. </p>
        <div v-for="house in store.houses" :key="house.id">
            <HouseItem :house="house" hasAction />
        </div>
    </div>
</template>

<style lang="css" scoped>
.page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header h3 {
    margin: 0;
}

.header .icon-button {
    display: none;
}

.toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

@media (max-width: 767px) {
    .page {
        padding: 0 var(--mobile-page-padding);
    }

    .toolbar {
        flex-direction: column;
        gap: 15px;
    }

    .header {
        position: relative;
    }

    .header h3 {
        flex: 1;
        text-align: center;
    }

    .header .button {
        display: none;
    }

    .header .icon-button {
        display: block;
        position: absolute;
        right: var(--mobile-page-padding);
        color: var(--text-secondary)
    }
}
</style>
