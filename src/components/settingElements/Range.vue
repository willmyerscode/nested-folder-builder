<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="field-range">
        <div class="label"><label>{{ item.title }}</label><span>{{ item.value }}{{ item.unit }}</span></div>
        <input :id="item.id" type="range" :name="item.id" :value="item.value" v-model="item.value" :step="item.step" :min="item.min" :max="item.max">
    </div>
</template>

<style scoped>
.field-range {
    display: flex;
    flex-direction: column;
    z-index: 0;
    padding: 12px 0;
    border-bottom: 1px solid #333;
}

.label {
    display:flex;
    justify-content:space-between;
    align-items: center;
}
.label label {
    flex-grow: 1;
}
.label span {
    font-size: 0.8rem;
}

.field-range input {
    margin-top: 12px;
    font-size: 13px;
    border-color: #fff;
    -webkit-appearance: none;
    width: 100%;
    height: 2px;
    background: #999;
    color: #fff;
    box-sizing: border-box
}
input::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 8px;
    width: 8px;
    transform: translateY(-3px);
    border-radius: 50%;
    background: #fff;
    cursor: ew-resize
}

input::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: 0 0;
    height: 2px
}

input[orient=vertical] {
    writing-mode: bt-lr;
    transform-origin: 50% 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(-90deg);
    width: calc(1.5 * var(--space-lg));
    height: 2px
}

input[orient=vertical]::-webkit-slider-thumb {
    cursor: ns-resize
}
</style>