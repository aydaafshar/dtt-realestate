<script setup lang="js">
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useHouses } from '../stores'
    import ListSort from '../components/ListSort.vue'
    import ListSearch from '../components/ListSearch.vue'
    import HouseItem from '../components/HouseItem.vue'
    import BaseButton from '../components/BaseButton.vue'
    import BaseIconButton from '../components/BaseIconButton.vue'

    // use router to navigate
    const router = useRouter()
    // use houses store to control the page
    const store = useHouses()

    onMounted(() => {
        // load the house list on start up
        store.loadMany()
    })
</script>

<template>
    <div class="page">
        <div class="header">
            <h3>Houses</h3>
            <!-- only appears on desktop screen, check the styles -->
            <BaseButton
                variant="primary"
                icon="plus"
                @click="router.push('/house/new')"
                >Create New</BaseButton
            >
            <!-- only appears on mobile screen -->
            <BaseIconButton
                icon="plus"
                size="2x"
                @click="router.push('/house/new')"
            />
        </div>
        <div class="toolbar">
            <ListSearch @search="store.search($event)" />
            <ListSort
                :items="['price', 'size']"
                :selected="store.sortType"
                @change="store.sort($event)"
            />
        </div>
        <div v-if="store.errorMessage" class="error">
            <p>{{ store.errorMessage }}</p>
        </div>
        <div class="no-results" v-if="store.searchCount == 0">
            <p>No results found.</p>
            <p>Please try another keyword.</p>
        </div>
        <h3 class="results-count" v-if="store.searchCount > 0">
            {{ store.searchCount }} results found.
        </h3>

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
        font-family: var(--font-2);
        font-weight: bold;
        font-size: 32px;
    }

    .header .icon-button {
        display: none;
    }

    .toolbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .no-results {
        height: 300px;
        width: 100%;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-secondary);
        font-family: var(--font-2);
        font-weight: var(--font-weight-medium);
        font-size: 18px;
    }

    .results-count {
        font-family: var(--font-2);
        font-weight: var(--font-weight-bold);
        font-size: 18px;
    }

    @media (max-width: 767px) {
        .page {
            padding: 0 var(--mobile-page-padding);
        }

        .toolbar {
            flex-direction: column;
            gap: 15px;
        }

        .no-results {
            font-size: 14px;
        }

        .header {
            position: relative;
        }

        .header h3 {
            flex: 1;
            text-align: center;
            font-size: 18px;
        }

        .header .button {
            display: none;
        }

        .header .icon-button {
            display: block;
            position: absolute;
            right: var(--mobile-page-padding);
            color: var(--text-secondary);
        }
    }
</style>
