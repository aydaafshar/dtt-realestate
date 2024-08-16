<script setup lang="js">
    import Badge from './BaseBadge.vue'
    import HouseActions from './HouseActions.vue'

    const props = defineProps({
        house: Object,
    })
</script>
<template>
    <div class="house" v-if="props.house">
        <img class="image" :src="props.house.image" />

        <div class="house-body">
            <div class="house-header">
                <h3>{{ props.house.location.street }}</h3>

                <div class="house-body-actions">
                    <HouseActions
                        v-if="props.house.madeByMe"
                        :id="props.house.id"
                    />
                </div>
            </div>

            <div class="house-row">
                <Badge icon="location-dot"
                    >{{ props.house.location.zip }}
                    {{ props.house.location.city }}
                </Badge>
            </div>

            <div class="house-row">
                <Badge icon="euro-sign">{{ props.house.price }}</Badge>
                <Badge icon="expand">{{ props.house.size }}</Badge>
                <Badge icon="trowel-bricks"
                    >Built in {{ props.house.constructionYear }}</Badge
                >
            </div>
            <div class="house-row">
                <Badge icon="bed">{{ props.house.rooms.bedrooms }}</Badge>
                <Badge icon="bath">{{ props.house.rooms.bathrooms }}</Badge>
                <Badge icon="warehouse">{{
                    props.house.hasGarage ? 'Yes' : 'No'
                }}</Badge>
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
        position: relative;
        background-color: var(--color-background-2);
    }

    .house-body {
        padding: 40px 30px;
        width: 100%;

        box-sizing: border-box;
        gap: 15px;
    }

    .house-row {
        display: flex;
        flex-direction: row;
        gap: 25px;
        font-size: 14px;
        font-family: var(--font-1);
        font-weight: var(--font-weight-bold);

        padding: 5px 0;
    }

    .house-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
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

    .house .house-header h3 {
        font-family: var(--font-2);
        font-weight: var(--font-weight-bold);
        font-size: 22px;
        margin-bottom: 10px;
    }

    @media (max-width: 767px) {
        .house-body-actions,
        .house .image {
            display: none;
        }

        .house {
            width: 100%;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
        }

        .house .house-header h3 {
            font-size: 14px;
        }
    }
</style>
