import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { createHouse, editHouse, getHouse } from "./api";

export const useSaveHouse = defineStore('save-house', () => {

    const houseId = ref();

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
        image: { value: '', isValid: true }
    });



    const validate = (name) => {
        switch (name) {
            case 'price':
                data.price.isValid = data.price.value !== '' && !isNaN(Number(data.price.value)) && Number(data.price.value) > 0;
                break;
            case 'bedrooms':
                data.bedrooms.isValid = data.bedrooms.value !== '' && !isNaN(Number(data.bedrooms.value)) && Number(data.bedrooms.value) > 0;
                break;
            case 'bathrooms':
                data.bathrooms.isValid = data.bathrooms.value !== '' && !isNaN(Number(data.bathrooms.value)) && Number(data.bathrooms.value) > 0;
                break;
            case 'size':
                data.size.isValid = data.size.value !== '' && !isNaN(Number(data.size.value)) && Number(data.size.value) > 0;
                break;
            case 'streetName':
                data.streetName.isValid = data.streetName.value.trim() !== '';
                break;
            case 'houseNumber':
                data.houseNumber.isValid = data.houseNumber.value.trim() !== '' && !isNaN(Number(data.houseNumber.value));
                break;
            case 'numberAddition':
                data.numberAddition.isValid = true; // Assuming this is optional
                break;
            case 'zip':
                data.zip.isValid = data.zip.value.trim() !== '';
                break;
            case 'city':
                data.city.isValid = data.city.value.trim() !== '';
                break;
            case 'constructionYear':
                const year = new Date(data.constructionYear.value).getFullYear();
                data.constructionYear.isValid = year > 1800 && year <= new Date().getFullYear();
                break;
            case 'hasGarage':
                data.hasGarage.isValid = ['true', 'false'].includes(data.hasGarage.value);
                break;
            case 'description':
                data.description.isValid = data.description.value.trim() !== '';
                break;
            case 'image':
                data.image.isValid = typeof data.image.value != undefined
            default:
                break;
        }
    };


    const isEditMode = computed(() => typeof houseId.value != 'undefined')

    const isValid = computed(() => Object.values(data).map(x => x.isValid).every(x => x))




    const prepare = async (id) => {
        houseId.value = id
        if (houseId.value) {
            getHouse(houseId.value).then(res => {
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
                data.numberAddition.value = house.location.houseNumberAddition.toString()
                data.image.value = house.image
            })
        } else {
            for (const key in data) {
                data[key].value = ''
                data[key].isValid = true
            }

        }
    }

    const save = () => {
        Object.keys(data).forEach((key) => {
            validate(key)
        })
        if (!isValid.value) {
            return
        }


        const formData = new FormData();
        for (const key in data) {
            if (key == 'image') {
                continue
            }
            formData.append(key, '' + data[key].value);
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

