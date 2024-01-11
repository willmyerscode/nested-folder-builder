<script setup>
import DemoWrapper from './DemoWrapper.vue';

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

const url = 'https://wm-proxy.vercel.app/proxy?targetUrl=' + props.src;
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
