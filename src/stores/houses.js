import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getHouse, getHouses } from './api'

export const useHouses = defineStore('houses', () => {
    const baseHouses = ref([])

    const house = ref()
    const sortType = ref('price')
    const searchText = ref('')
    const errorMessage = ref('')

    const loadMany = async () => {
        try {
            errorMessage.value = ''
            const data = await getHouses()
            baseHouses.value = data
        } catch (e) {
            errorMessage.value = 'Could not load the houses.'
        }
    }

    const sort = (type) => {
        if (!['price', 'size'].includes(type)) {
            sortType.value = 'price'
            return
        }
        sortType.value = type
    }

    const search = (text) => {
        searchText.value = text
    }

    const loadOne = async (id) => {
        try {
            errorMessage.value = ''
            const data = await getHouse(id)
            house.value = data[0]
            // in-case user navigates to detail page directly we need to fetch the houses
            // to make the recommendation list
            if (baseHouses.value.length === 0) {
                await loadMany()
            }
        } catch (e) {
            errorMessage.value = `Could not load the house with id:${id}`
        }
    }

    const remove = (id) => {

    }

    const houses = computed(() => {
        const result = baseHouses.value.filter(
            (h) =>
                searchText.value == '' ||
                h.description.search(searchText.value) > -1 ||
                h.location.city.includes(searchText.value) ||
                h.location.street.includes(searchText.value)
        )
        if (sortType.value === 'price') {
            result.sort((a, b) => b.price - a.price)
        } else if (sortType.value === 'size') {
            result.sort((a, b) => b.size - a.size)
        }
        return result
    })

    const recommendedHouses = computed(() => {

        if (!house.value || !baseHouses.value) {
            return []
        }

        const result = baseHouses.value.filter((h) => h.location.zip === house.value.location.zip && h.id !== house.value.id).slice(0, 5)
        if (result.length === 0) {
            return baseHouses.value.slice(0, 5)
        }
        return result
    })


    const searchCount = computed(() => {
        if (searchText.value === "") {
            return 0
        }

        return houses.value.length
    })

    return {
        houses,
        recommendedHouses,
        house,
        sortType,
        errorMessage,
        searchCount,
        loadMany,
        loadOne,
        sort,
        search,
        remove,
    }
})
