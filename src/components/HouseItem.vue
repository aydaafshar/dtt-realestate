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
    <div v-if="props.house" class="house-item">
        <RouterLink class="image-container" :to="`/house/${props.house.id}`">
            <img class="image" :src="props.house.image" />
        </RouterLink>
        <div class="house-item-content">
            <h3 class="street">{{ props.house.location.street }}</h3>
            <p class="price">&#8364; {{ props.house.price }}</p>
            <p class="zip">{{ props.house.location.zip }} {{ props.house.location.city }}</p>
            <div class="house-item-icons">
                <Badge icon="bed">{{ props.house.rooms.bedrooms }}</Badge>
                <Badge icon="bath">{{ props.house.rooms.bathrooms }}</Badge>
                <Badge icon="square">{{ props.house.size }}</Badge>
            </div>
        </div>
        <div class="actions">
            <HouseActions v-if="props.house.madeByMe" :id="props.house.id" />
        </div>
    </div>
</template>

<style lang="css" scoped>
.house-item {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: var(--shadow-2);
    color: var(--text-secondary);
    background-color: var(--color-background-2);
}

.house-item-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    gap: 0px;
}

.house-item-icons {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    box-sizing: border-box;
}

.house-item p,
.house-item h3 {
    margin: 0;
}

.house-item .street {
    color: var(--text-primary)
}

.house-item .price {
    color: var(--text-secondary)
}

.house-item .zip {
    color: var(--color-quaternary)
}

.house-item .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.house-item .image {
    width: 100px;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
    object-fit: cover;
}

.house-item .actions {
    position: absolute;
    right: 10px;
}

@media (max-width:767px) {

    .house-item h3,
    .house-item p {
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>