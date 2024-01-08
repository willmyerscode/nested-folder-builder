<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="field-dropdown">
        <label :for="item.id">
            {{ item.title }}
        </label>
        <select :name="item.id" :id="item.id" v-model="item.value">
            <option v-for="option in item.options" :value="option.value">{{ option.title }}</option>
        </select>
    </div>
</template>

<style scoped>
.field-dropdown {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 12px 0;
    border-bottom: 1px solid #333;
}

label {
    position: absolute;
    z-index: 0;
    top:50%;
    transform: translateY(-50%);
}

select {
    border: 0;
    background: transparent;
    text-align: end;
    z-index: 1;
    color: #ccc;
    font-size: 13px;
}
</style>