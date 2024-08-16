import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { createHouse, editHouse, getHouse } from './api'

// creates or edits a house

export const useSaveHouse = defineStore('save-house', () => {
    // stores the house id if we are in edit mode
    const houseId = ref()

    // a flag to show if we are in create mode or edit mode
    // based on this flag we will decide to call the correct api
    const isEditMode = computed(() => typeof houseId.value != 'undefined')

    // data object of the form
    // initially all the fields are set to have isValid to true
    // to avoid having errors when we navigate to the page
    const data = reactive({
        price: { value: '', isValid: true },
        bedrooms: { value: '', isValid: true },
        bathrooms: { value: '', isValid: true },
        size: { value: '', isValid: true },
        streetName: { value: '', isValid: true },
        houseNumber: { value: '', isValid: true },
        numberAddition: { value: '', isValid: true },
        zip: { value: '', isValid: true },
        city: { value: '', isValid: true },
        constructionYear: { value: '', isValid: true },
        hasGarage: { value: '', isValid: true },
        description: { value: '', isValid: true },
        image: { value: '', isValid: true },
    })

    // validates the data - each input field will call this method when user types something
    // if any field was invalid then the `isValid` flag of the data object for that field will change to false
    const validate = (name) => {
        switch (name) {
            case 'price':
                data.price.isValid =
                    data.price.value !== '' &&
                    !isNaN(Number(data.price.value)) &&
                    Number(data.price.value) > 0
                break
            case 'bedrooms':
                data.bedrooms.isValid =
                    data.bedrooms.value !== '' &&
                    !isNaN(Number(data.bedrooms.value)) &&
                    Number(data.bedrooms.value) > 0
                break
            case 'bathrooms':
                data.bathrooms.isValid =
                    data.bathrooms.value !== '' &&
                    !isNaN(Number(data.bathrooms.value)) &&
                    Number(data.bathrooms.value) > 0
                break
            case 'size':
                data.size.isValid =
                    data.size.value !== '' &&
                    !isNaN(Number(data.size.value)) &&
                    Number(data.size.value) > 0
                break
            case 'streetName':
                data.streetName.isValid = data.streetName.value.trim() !== ''
                break
            case 'houseNumber':
                data.houseNumber.isValid =
                    data.houseNumber.value.trim() !== '' &&
                    !isNaN(Number(data.houseNumber.value))
                break
            case 'numberAddition':
                data.numberAddition.isValid = true // Assuming this is optional
                break
            case 'zip':
                data.zip.isValid = data.zip.value.trim() !== ''
                break
            case 'city':
                data.city.isValid = data.city.value.trim() !== ''
                break
            case 'constructionYear':
                const year = new Date(data.constructionYear.value).getFullYear()
                data.constructionYear.isValid =
                    year > 1800 && year <= new Date().getFullYear()
                break
            case 'hasGarage':
                data.hasGarage.isValid = ['true', 'false'].includes(
                    data.hasGarage.value
                )
                break
            case 'description':
                data.description.isValid = data.description.value.trim() !== ''
                break
            case 'image':
                data.image.isValid = typeof data.image.value != undefined
            default:
                break
        }
    }

    // ensures all the isValid flags are true
    const isValid = computed(() =>
        Object.values(data)
            .map((x) => x.isValid)
            .every((x) => x)
    )

    // this method will be called at page start, to initialize the data object
    const prepare = async (id) => {
        houseId.value = id
        // if we have an id then we need to load the house for that id to our data object
        if (houseId.value) {
            //edit mode
            getHouse(houseId.value).then((res) => {
                const house = res[0]
                data.size.value = house.size.toString()
                data.price.value = house.price.toString()
                data.description.value = house.description
                data.bathrooms.value = house.rooms.bathrooms.toString()
                data.bedrooms.value = house.rooms.bedrooms.toString()
                data.hasGarage.value = house.hasGarage ? 'true' : 'false'
                data.constructionYear.value = house.constructionYear.toString()
                data.zip.value = house.location.zip.toString()
                data.city.value = house.location.city.toString()
                data.streetName.value = house.location.street
                data.houseNumber.value = house.location.houseNumber.toString()
                data.numberAddition.value =
                    house.location.houseNumberAddition.toString()
                data.image.value = house.image
            })
        } else {
            //create mode

            // we need to make sure that our object is fresh.
            for (const key in data) {
                data[key].value = ''
                data[key].isValid = true
            }
        }
    }

    // saves the house based on isEditMode computed value
    const save = () => {
        // before saving we need to validate each field in the data object
        // since we have all the fields stored as a key value in the data object
        // we need to loop over it and call the validate with the correct key
        Object.keys(data).forEach((key) => {
            validate(key)
        })

        // if the form is not valid do not save the house
        // in this case since we have already called validate on each field the validation errors will be displayed on the page
        if (!isValid.value) {
            return
        }

        // initialize the create/edit request payload
        const formData = new FormData()
        for (const key in data) {
            // we are passing the image as a second argument to create/edit functions
            // so we need to skip it
            if (key == 'image') {
                continue
            }
            formData.append(key, '' + data[key].value)
        }

        // edit mode
        if (houseId.value) {
            return editHouse(houseId.value, formData, data.image.value)
        }
        // create mode
        return createHouse(formData, data.image.value)
    }

    return {
        data,
        isEditMode,
        isValid,
        validate,
        prepare,
        save,
    }
})
