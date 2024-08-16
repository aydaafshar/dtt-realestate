import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getHouse, getHouses, removeHouse } from './api'

export const useHouses = defineStore('houses', () => {
    // base list of houses,
    // will be used inside computed fields to apply sorting and filtering
    const baseHouses = ref([])

    // holds the value for a single house, when user loads a house by id
    const house = ref()

    // holds the value of the selected sort type for the house list
    const sortType = ref('price')

    // holds the current search value for the house list, this will be used to filter the baseHouses ref
    const searchText = ref('')

    // error message of the api calls
    const errorMessage = ref('')

    // loads list of the houses and stores them in the baseHouse
    const loadMany = async () => {
        try {
            // clean up the error value,(we may have some errors stored here from the previous attempts)
            errorMessage.value = ''

            // getting the list of the houses
            const data = await getHouses()

            // updating the baseHouses with the new items
            baseHouses.value = data
        } catch (e) {
            // if some thing goes wrong we will store this error message here
            errorMessage.value = 'Could not load the houses.'
        }
    }

    // sorts the houses based on price or size
    const sort = (type) => {
        // just checking if the correct value (price, size) was passed as an argument
        if (!['price', 'size'].includes(type)) {
            // if sort type was invalid, we set it back to default value
            sortType.value = 'price'
            return
        }

        // updating the current sort type value
        sortType.value = type
    }

    // set the new search text
    const search = (text) => {
        searchText.value = text
    }

    // loads one house by id
    const loadOne = async (id) => {
        house.value = undefined
        try {
            // clean up the error value,(we may have some errors stored here from the previous attempts)
            errorMessage.value = ''

            // getting the data
            const data = await getHouse(id)
            // api returns an array with one item in it for fetching a house by id, so we need to use the first index of the array
            house.value = data[0]
            // in-case user navigates to detail page directly we need to fetch the houses
            // to make the recommendation list
            if (baseHouses.value.length === 0) {
                await loadMany()
            }
        } catch (e) {
            // setting the error message if something goes wrong
            errorMessage.value = `Could not load the house with id:${id}`
        }
    }

    // removes the house by id
    const remove = async (id) => {
        await removeHouse(id)

        // to avoid refetching the list, we are filtering the baseHouses to remove this house from it
        baseHouses.value = baseHouses.value.filter((x) => x.id !== id)
    }

    // all the sorting and filtering on the list happens in this computed field
    const houses = computed(() => {
        // filter the houses based on search text
        const result = baseHouses.value.filter(
            (h) =>
                searchText.value == '' ||
                h.description.search(searchText.value) > -1 ||
                h.location.city.includes(searchText.value) ||
                h.location.street.includes(searchText.value)
        )

        // sort the houses based on sort type
        if (sortType.value === 'price') {
            result.sort((a, b) => b.price - a.price)
        } else if (sortType.value === 'size') {
            result.sort((a, b) => b.size - a.size)
        }

        return result
    })

    // recommended houses based on the loaded house ref
    const recommendedHouses = computed(() => {
        // if there are no house and house list loaded then return nothing
        if (!house.value || !baseHouses.value) {
            return []
        }

        // based on the selected house , we will try to match the address and load 5 houses as a recommendation list
        const result = baseHouses.value
            .filter(
                (h) =>
                    h.location.zip === house.value.location.zip &&
                    h.id !== house.value.id
            )
            .slice(0, 5)

        // if there nothing was matching with house then we return first 5 houses from the list
        if (result.length === 0) {
            return baseHouses.value.slice(0, 5)
        }
        return result
    })

    // this will return, the search result count
    const searchCount = computed(() => {
        // when user is not searching it returns -1, meaning that user is not searching
        if (searchText.value === '') {
            return -1
        }

        // search count
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
