<script setup>
const props = defineProps({
    id: String,
    label: String,
    required: Boolean,
    valid: Boolean
})

</script>
<template>
    <div class="input-field-container">
        <label :for="props.id">{{ props.label }}{{ props.required ? '*' : '(optional)' }}</label>
        <div class="input" :class="{ 'invalid': props.valid === false }">
            <slot></slot>
        </div>
    </div>
</template>


<style lang="css">
.input-field-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.input-field-container .input {
    border: none;
    border-radius: 5px;
    background-color: lightgray;
    border: 1px solid lightgray;
    padding: 5px 10px;
    box-sizing: border-box;
    width: 100%;

}

.input-field-container .input.invalid {
    border: 1px solid red;
}

.input-field-container .input input,
.input-field-container .input select,
.input-field-container .input textarea {
    border: 0;
    background-color: transparent;
    width: 100%;
}


.input-field-container .input textarea {
    min-height: 100px;
}


.input-field-container .input input:focus,
.input-field-container .input select:focus,
.input-field-container .input textarea:focus {
    outline: none;
}
</style>