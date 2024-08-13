import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useModal = defineStore('modal', () => {

    const isVisible = ref(false)
    const state = reactive({
        title: '',
        description: '',
        onResult: () => { }
    })



    const open = (title, description, onResult) => {
        isVisible.value = true
        state.title = title
        state.description = description
        state.onResult = onResult
    }


    const close = (confirmed) => {
        state.onResult(confirmed)
        isVisible.value = false
        state.title = ''
        state.description = ''
    }



    return {
        isVisible,
        state,
        open,
        close
    }

})