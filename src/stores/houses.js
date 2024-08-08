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
            house.value = data
        } catch (e) {
            errorMessage.value = `Could not load the house with id:${id}`
        }
    }
    const create = () => {}

    const edit = () => {}

    const upload = () => {}

    const remove = () => {}

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

    return {
        houses,
        house,
        sortType,
        errorMessage,
        loadMany,
        loadOne,
        sort,
        search,
        create,
        edit,
        remove,
        upload,
    }
})
