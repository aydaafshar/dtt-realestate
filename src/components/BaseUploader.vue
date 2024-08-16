<script setup>
    import { computed, ref } from 'vue'

    const image = defineModel()

    // image from your computer
    const localImage = ref()

    // for validation
    const emit = defineEmits(['change'])

    const clear = () => {
        image.value = undefined
    }

    const previewImage = computed(() => {
        // url image
        if (typeof image.value === 'string') {
            return image.value
        }

        // from local disk
        return localImage.value
    })

    const onFileChange = (e) => {
        const file = e.target.files[0]
        image.value = file

        // this will convert the file loaded from the computer to a base64 url
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            // When the file is read, set the imageUrl to the file's data URL
            reader.onload = (e) => {
                localImage.value = e.target.result
            }
            // Read the image file as a data URL
            reader.readAsDataURL(file)
        } else {
            localImage.value = null // Clear the preview if no image or wrong file type
        }

        emit('change', e)
    }
</script>

<template>
    <div class="uploader" :class="{ borderd: !image }">
        <img v-if="image" :src="previewImage" />
        <font-awesome-icon v-if="!image" icon="plus" size="3x" />
        <input type="file" @change="onFileChange" />
        <button v-if="image" class="close" @click="clear()">x</button>
    </div>
</template>

<style lang="css">
    .uploader {
        position: relative;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-quaternary);
        box-sizing: border-box;
    }

    .uploader.borderd {
        border: 2px dashed var(--color-quaternary);
    }

    .uploader img {
        width: 100%;
        height: 100%;
        z-index: 0;
        border-radius: 10px;
        object-fit: cover;
    }

    .uploader input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
    }

    .uploader .close {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 24px;
        height: 24px;
        z-index: 10;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: none;
        color: gray;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }
</style>
