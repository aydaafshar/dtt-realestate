<script setup lang="js">
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useHouses } from "../stores"
import HouseItem from '../components/HouseItem.vue'
import HouseDetail from '../components/HouseDetail.vue';
import BaseBackButton from "../components/BaseBackButton.vue";

const route = useRoute()
const store = useHouses()

onMounted(() => {
    store.loadOne(route.params.id)
})

onBeforeRouteUpdate((to) => {
    store.loadOne(to.params.id)
})

</script>

<template>
    <BaseBackButton to="/house">Back to overview</BaseBackButton>
    <div class="house-detail-page">
        <HouseDetail :house="store.house" />

        <div class="recommendation-list-container">
            <h2>Recommendation List</h2>
            <HouseItem v-for="house of store.recommendedHouses" :house="house" />
        </div>
    </div>
</template>

<style lang="css">
.house-detail-page {

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
}

.recommendation-list-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 300px;
}
</style>
