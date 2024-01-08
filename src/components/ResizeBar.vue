<script setup>
import ResizeBar from './icons/Bars2.vue';


</script>

<template>
    <div class="resize-bar">
        <ResizeBar />
    </div>
</template>

<style scoped>
.resize-bar {
    display: block;
    width: 15px;
    align-self: stretch;
    display: grid;
    place-items: center;
    border: 1px solid #333;
    cursor: col-resize;
}
.resize-bar:hover {
    background-color: #333;
}
.resize-bar:active {
    background-color: #555;
}
.resize-bar svg {
    transform: rotate(90deg)
}
</style>