<script setup lang="js">
import Badge from './BaseBadge.vue';
import HouseActions from './HouseActions.vue';

const props = defineProps({
    house: Object
})


</script>
<template>
    <div class="house-detail" v-if="props.house">
        <img class="image" :src="props.house.image" />
        <div class="house-detail-header">
            <p>{{ props.house.location.street }}</p>
            <HouseActions v-if="props.house.madeByMe" :id="props.house.id" />
        </div>

        <Badge icon="bed">{{ props.house.location.zip }} {{ props.house.location.city }}</Badge>

        <div class="house-detail-row">
            <Badge icon="bed">{{ props.house.price }}</Badge>
            <Badge icon="bath">{{ props.house.size }}</Badge>
            <Badge icon="square">Built in {{ props.house.constructionYear }}</Badge>
        </div>
        <div class="house-detail-row">
            <Badge icon="bed">{{ props.house.rooms.bedrooms }}</Badge>
            <Badge icon="bath">{{ props.house.rooms.bathrooms }}</Badge>
            <Badge icon="square">{{ props.house.hasGarage ? 'Yes' : 'No' }}</Badge>
        </div>
        <div class="house-detail-description">
            {{ props.house.description }}
        </div>


    </div>
</template>

<style lang="css" scoped>
.house-detail {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}


.house-detail-row {
    display: flex;
    flex-direction: row;
    gap: 10px
}

.house-detail-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between
}

.house-detail-description {
    margin: 0;
    text-align: left;
}

.house-detail .image {
    width: 300px;
    height: 300px;
}
</style>