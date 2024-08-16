import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// the store is used to control the modal
export const useModal = defineStore('modal', () => {
    // toggles the modal's visibility
    const isVisible = ref(false)

    // controls the modal's settings
    const state = reactive({
        title: '',
        description: '',
        onResult: () => {},
    })

    // opens a modal with title and description
    // and a result callback
    const open = (title, description, onResult) => {
        isVisible.value = true
        state.title = title
        state.description = description
        state.onResult = onResult
    }

    // closes the modal with result (true means confirmed, false means canceled)
    const close = (confirmed) => {
        // invokes the callback with the result
        state.onResult(confirmed)
        // hide the modal
        isVisible.value = false

        // cleanup the state for the next use
        state.title = ''
        state.description = ''
    }

    return {
        isVisible,
        state,
        open,
        close,
    }
})
