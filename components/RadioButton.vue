<template>
    <div class="radio py-2 " :class="{ checked }" @click="mark">
        <label :for="name" class="pointer">
            <input type="radio" :name="name" :value="value" :checked="checked" />
            {{ label }}
        </label>
    </div>
</template>
<style>

</style>
<script lang="ts" setup>
const { label } = defineProps<{
    label: string,
    value: any,
    name: string
}>();

const emit = defineEmits<{
    (e: 'input', value: boolean)
}>();

const checked = ref(false)


function mark() {
    checked.value = !checked.value;
    emit("input", checked.value);
}

</script>

<style scoped>
.radio {
    position: relative;
}

.radio label {
    margin-left: 0.8em
}

.radio input {
    opacity: 0
}

.checked::after {
    content: ' ';
    position: absolute;
    left: 1px;
    top: 6px;
    border-radius: 10px;
    height: 12px;
    width: 12px;
    background-color: var(--bs-success);
}

.radio::before {
    cursor: pointer;
    content: ' ';
    position: absolute;
    display: inline;
    top: 7px;
    left: -5px;
    height: 24px;
    width: 24px;
    border-radius: 15px;
    border: 4px solid var(--bs-success);
}
</style>
