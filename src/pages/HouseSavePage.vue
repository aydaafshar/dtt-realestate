<script setup lang="js">
import { useRoute, useRouter } from 'vue-router';
import Button from '../components/BaseButton.vue';
import BackButton from '../components/BaseBackButton.vue';
import InputField from '../components/BaseInputField.vue';
import Uploader from '../components/BaseUploader.vue';
import { useSaveHouse } from '../stores';
import { onMounted } from 'vue';

const route = useRoute()
const router = useRouter()
const store = useSaveHouse()


onMounted(() => {
    store.prepare(route.params.id)
})

const submit = () => {

    store.save().then(id => {
        router.push(`/house/${id}`)
    })
}

</script>
<template>
    <div class="save-page">
        <BackButton :to="store.isEditMode ? `/house/${route.params.id}` : '/house'">
            {{ store.isEditMode ? 'Back to detail page' : 'Back to overview' }}
        </BackButton>
        <h2>
            {{ store.isEditMode ? 'Edit listing' : 'Create new listing' }}
        </h2>

        <form @submit.prevent="submit()">
            <div class="grid">
                <div class="row">
                    <InputField label="Street name" required :valid="store.data.streetName.isValid">
                        <input name="streetName" @input="store.validate($event.target.name)"
                            v-model="store.data.streetName.value" />
                    </InputField>
                </div>

                <InputField label="House number" required :valid="store.data.houseNumber.isValid">
                    <input name="houseNumber" @input="store.validate($event.target.name)"
                        v-model="store.data.houseNumber.value" />
                </InputField>

                <InputField label="Addition" :valid="store.data.numberAddition.isValid">
                    <input name="numberAddition" @input="store.validate($event.target.name)"
                        v-model="store.data.numberAddition.value" />
                </InputField>

                <div class="row">
                    <InputField label="Postal code" required :valid="store.data.zip.isValid">
                        <input name="zip" @input="store.validate($event.target.name)" v-model="store.data.zip.value" />
                    </InputField>
                </div>

                <div class="row">
                    <InputField label="City" required :valid="store.data.city.isValid">
                        <input name="city" @input="store.validate($event.target.name)"
                            v-model="store.data.city.value" />
                    </InputField>
                </div>

                <div class="row">
                    <label>Upload picture (PNG or JPG)*</label>
                    <Uploader v-model="store.data.image.value" @change="store.validate('image')" />
                </div>

                <div class="row">
                    <InputField label="Price" required :valid="store.data.price.isValid">
                        <input name="price" @input="store.validate($event.target.name)"
                            v-model="store.data.price.value" />
                    </InputField>
                </div>

                <InputField label="Size" required :valid="store.data.size.isValid">
                    <input name="size" @input="store.validate($event.target.name)" v-model="store.data.size.value" />
                </InputField>

                <InputField label="Garage" required :valid="store.data.hasGarage.isValid">
                    <select required name="hasGarage" @change="store.validate($event.target.name)"
                        v-model="store.data.hasGarage.value">
                        <option></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </InputField>

                <InputField label="Bedrooms" required :valid="store.data.bedrooms.isValid">
                    <input name="bedrooms" @input="store.validate($event.target.name)"
                        v-model="store.data.bedrooms.value" />
                </InputField>

                <InputField label="Bathrooms" required :valid="store.data.bathrooms.isValid">
                    <input name="bathrooms" @input="store.validate($event.target.name)"
                        v-model="store.data.bathrooms.value" />
                </InputField>

                <div class="row">
                    <InputField label="Construction date" required :valid="store.data.constructionYear.isValid">
                        <input name="constructionYear" @input="store.validate($event.target.name)"
                            v-model="store.data.constructionYear.value" />
                    </InputField>
                </div>

                <div class="row">
                    <InputField label="Description" required :valid="store.data.description.isValid">
                        <textarea name="description" @input="store.validate($event.target.name)"
                            v-model="store.data.description.value"></textarea>
                    </InputField>
                </div>
                <span class="row error" v-if="!store.isValid">Please fill all the required fields</span>
                <span></span>
                <Button :disabled="!store.isValid" type="submit" variant="primary">Post</Button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="css">
.save-page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}


.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.grid .row {
    grid-column: span 2;
}

.grid .row.error {
    color: red;
}
</style>
