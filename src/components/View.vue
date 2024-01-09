<script setup>
import DemoWrapper from './DemoWrapper.vue';
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    fields: {
        type: Object,
        required: true
    }
});

const content = ref('');
const isLoading = ref(true);
const error = ref(null);

async function fetchContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load page');
        const text = await response.text();
        return text;
    } catch (err) {
        console.error('Error fetching:', err);
        error.value = err.message;
    }
}

async function parseContent(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.querySelector('#sections');
}

function initSSFunctions() {
    window.Squarespace?.globalInit(Y);
    window.Squarespace?.initializeLayoutBlocks(Y, Y.one(section));
    window.Squarespace?.initializeNativeVideo(Y, Y.one(section));
    window.Squarespace?.initializePageContent(Y, Y.one(section));
    window.dispatchEvent(new Event('wmSyntaxHighlight'))
}

onMounted(async () => {
    // if (props.src == 'design') {
    //     error.value = false;
    //     isLoading.value = false;
    //     return;
    // }
    // isLoading.value = true;
    // const url = import.meta.env.DEV ? `/will-myers${props.src}` : props.src;
    // const text = await fetchContent(url);
    // const section = await parseContent(text);

    // if (section) {
    //     content.value = section.innerHTML;
    //     isLoading.value = false;
    //     await nextTick();
    //     //initSSFunctions()
    // } else {
    //     isLoading.value = false;
    //     error.value = '#sections not found';
    // }
    // isLoading.value = false;
});

const url = 'https://wm-proxy.vercel.app/proxy?targetUrl=' + props.src;
console.log(url)
</script>

<template>
    <div>
        <div>
            <!--<div v-if="src !== 'design' && !isLoading && !error" v-html="content" id="sections" class="sections"></div>-->
            <iframe v-if="src !== 'design'" :src="url"></iframe>
            <DemoWrapper v-else :fields="fields"/>
        </div>
        <!-- <div v-if="src !== 'design'" class="loading">Loading...</div> -->
        <!-- <div v-if="error">{{ error }}</div> -->
    </div>
</template>

<style> #installation-app #sections .page-section {
     flex: 1 0 auto;
     margin-right: 200px;
 }

 #installation-app #sections .page-section .content-wrapper {
     max-width: 767px !important;
 }

 @media(max-width: 1250px) {
     #installation-app #sections .page-section {
         margin-right: 0px;
     }

     #installation-app #sections .page-section .content-wrapper {
         max-width: 100% !important;
     }
 }

 #installation-app pre {
     overflow-x: auto;
     box-sizing: border-box;
 }

 .fluid-engine #installation-app #sections .sqs-block {
     padding-top: 17px;
     padding-bottom: 17px;
 }
</style>

<style scoped>
.loading {
    display: grid;
    place-items: center;
    min-height: 100vh;
    width: 100%;
}


iframe {
    width: 100%;
    height: 100vh;
    border: 0;
}
</style>
