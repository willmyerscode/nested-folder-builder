<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="field-text-input">
        <label>{{ item.title }}</label>
        <input :id="item.id" type="input" :name="item.id" :value="item.value" v-model="item.value">
    </div>
</template>

<style scoped>
.field-text-input {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    border-bottom: 1px solid #333;
}
input {
    margin-top: 12px;
    font-size: 1rem;
    border-color: #fff;
    border-width: 1px;
    border-style: solid;
    background: #333;
    padding: 4px 8px;
    border-radius: 3px;
    color: white;
}
</style>