<script setup lang="js">
import { onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useHouses } from "../stores"
import HouseItem from '../components/HouseItem.vue'
import HouseDetail from '../components/HouseDetail.vue';
import HouseActions from '../components/HouseActions.vue';
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
    <div v-if="store.house" class="header">
        <img class="image" :src="store.house.image" />
        <div class="toolbar">
            <BaseBackButton to="/house">
                <span class="back-button-label">
                    Back to overview
                </span>
            </BaseBackButton>
            <div class="toolbar-house-actions">
                <HouseActions v-if="store.house.madeByMe" :id="store.house.id" />
            </div>
        </div>
    </div>
    <div class="house-detail-page">
        <div class="content">
            <HouseDetail :house="store.house" />
        </div>
        <div class="recommended">
            <h2>Recommended for you</h2>
            <HouseItem v-for="house of store.recommendedHouses" :house="house" />
        </div>
    </div>
</template>

<style lang="css">
.house-detail-page {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 60px;
}

.content {
    flex: 1;
}


.header .image,
.header .toolbar .toolbar-house-actions {
    display: none;
}

.header .toolbar {
    position: unset;
}

.recommended h2 {
    margin: 0;
}

.recommended {

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
}




@media (max-width: 767px) {
    .house-detail-page {
        flex-direction: column;
        justify-content: center;
        gap: 0px;
        width: 100%;
        transform: translateY(-30px);
    }

    .content {
        width: 100%;
    }

    .recommended {
        min-width: unset;
        width: 100%;
        padding: var(--mobile-page-padding);
        box-sizing: border-box;
    }

    .header .image {
        display: block;
        object-fit: cover;
        width: 100%;
    }

    .header {
        position: relative;
    }

    .header .toolbar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 30px 15px;
    }


    .header .toolbar .icon-button {
        color: #fff
    }


    .header .image {
        z-index: 0;
    }

    .header .toolbar .back-button-label {
        display: none;
    }

    .header .toolbar .toolbar-house-actions {
        display: block;
    }
}
</style>
