<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Demo from './Demo.vue'
import ResizeBar from './ResizeBar.vue'

const props = defineProps({
    fields: {
        type: Object,
        required: true,
    }
})
const demoWidth = ref('100%'); 
const overlayDisplay = ref('none'); 

const initResize = (event) => {
    window.addEventListener('mouseleave', stopResizing);
    window.addEventListener('mousemove', startResizing);
    window.addEventListener('mouseup', stopResizing);
};

const startResizing = (event) => {
    const offsetLeft = document.querySelector('.iframe-container').getBoundingClientRect().left;
    let newWidth = event.clientX - offsetLeft;
    if (newWidth >= (window.innerWidth - offsetLeft - 15)) newWidth = window.innerWidth - offsetLeft - 15
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    overlayDisplay.value = 'block';
    demoWidth.value = newWidth + 'px';
};

const stopResizing = () => {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', startResizing);
    window.removeEventListener('mouseup', stopResizing);
    window.removeEventListener('mouseleave', stopResizing);
    overlayDisplay.value = 'none';
};

onMounted(() => {
    const resizeBar = document.querySelector('.resize-bar');
    resizeBar.addEventListener('mousedown', initResize);
});

onBeforeUnmount(() => {
    const resizeBar = document.querySelector('.resize-bar');
    if(resizeBar) {
        resizeBar.removeEventListener('mousedown', initResize);
    }
    stopResizing(); 
});

window.addEventListener('resize', () => {
    stopResizing();
    demoWidth.value = '100%';
})
</script>

<template>
    <div>
        <div class="demo-wrapper">
            <div class="iframe-container" :style="{ width: demoWidth }">
                <Demo :fields="fields"/>
                <div class="iframe-overlay" :style="{display: overlayDisplay}"></div>
            </div>
            <ResizeBar />
        </div>
    </div>
</template>

<style scoped>
.demo-wrapper {
    display:flex;
    height: 100%;
    position: relative;
}

.iframe-container {
    position:relative;
    flex: 0 1 auto;
}
iframe {
    border: 0;
    width:100%;
    height: 100%;
}
.iframe-overlay {
    position:absolute;
    top:0;
    left: 0;
    height: 100%;
    width:100%;
}
</style>