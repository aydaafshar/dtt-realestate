<script setup lang="js">
import { useRouter } from 'vue-router';
import Badge from './BaseBadge.vue';
import HouseActions from './HouseActions.vue';

const router = useRouter()


const props = defineProps({
    house: Object
})


</script>
<template>
    <div v-if="props.house" class="list-item">
        <RouterLink :to="`/house/${props.house.id}`">
            <img class="image" :src="props.house.image" />
        </RouterLink>
        <div class="list-item-content">
            <p>{{ props.house.location.street }}</p>
            <p>{{ props.house.price }}</p>
            <p>{{ props.house.location.zip }} {{ props.house.location.city }}</p>
            <div class="list-item-icons">
                <Badge icon="bed">{{ props.house.rooms.bedrooms }}</Badge>
                <Badge icon="bath">{{ props.house.rooms.bathrooms }}</Badge>
                <Badge icon="square">{{ props.house.size }}</Badge>
            </div>
        </div>
        <HouseActions v-if="props.house.madeByMe" :id="props.house.id" />
    </div>
</template>

<style lang="css" scoped>
.list-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.list-item-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.list-item-icons {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.list-item p {
    margin: 0;
}

.list-item .image {
    height: 60px;
    width: 60px;
    border-radius: 10px;
    cursor: pointer;
}
</style>