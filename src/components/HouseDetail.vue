<script setup lang="js">
import Badge from './BaseBadge.vue';
import HouseActions from './HouseActions.vue';

const props = defineProps({
    house: Object
})


</script>
<template>
    <div class="house" v-if="props.house">
        <img class="image" :src="props.house.image" />

        <div class="house-body">

            <div class="house-header">
                <p>{{ props.house.location.street }}</p>

                <div class="house-body-actions">
                    <HouseActions v-if="props.house.madeByMe" :id="props.house.id" />
                </div>
            </div>

            <Badge icon="bed">{{ props.house.location.zip }} {{ props.house.location.city }}</Badge>

            <div class="house-row">
                <Badge icon="bed">{{ props.house.price }}</Badge>
                <Badge icon="bath">{{ props.house.size }}</Badge>
                <Badge icon="square">Built in {{ props.house.constructionYear }}</Badge>
            </div>
            <div class="house-row">
                <Badge icon="bed">{{ props.house.rooms.bedrooms }}</Badge>
                <Badge icon="bath">{{ props.house.rooms.bathrooms }}</Badge>
                <Badge icon="square">{{ props.house.hasGarage ? 'Yes' : 'No' }}</Badge>
            </div>
            <div class="house-description">
                {{ props.house.description }}
            </div>
        </div>

    </div>
</template>

<style lang="css" scoped>
.house {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    background-color: var(--color-background-2);
}

.house-body {
    padding: 20px;
    width: 100%;

    box-sizing: border-box;
}


.house-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.house-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between
}

.house-description {
    text-align: left;
    margin-top: 10px;
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-all;
    padding: 10px 0;
    text-align: justify;
}

.house .image {
    width: 100%;
    object-fit: cover;
}

@media (max-width:767px) {

    .house-body-actions,
    .house .image {
        display: none;
    }

    .house {
        width: 100%;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
    }
}
</style>