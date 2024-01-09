<script setup>
import Prism from 'prismjs';
import Settings from './components/Settings.vue'
import MainNavigation from './components/MainNavigation.vue'
import View from './components/View.vue'
import data from './data.js'
import navigation from './navigation.js'
import { ref, computed, watch, onMounted, nextTick } from "vue";

const settings = ref(data);

const fields = computed(() => {
  const result = {};
  Object.entries(settings.value).forEach(([key, category]) => {
    result[key] = category.fields;
  });
  return result;
});

onMounted(() => {
  Prism.highlightAll()
});

watch(settings, () => {
  nextTick(() => {
    Prism.highlightAll()
  });
}, { deep: true });

const initialPage = navigation.items[0].page
const activePage = ref(initialPage);
const currentPage = ref(initialPage)
const changePage = (page) => {
  activePage.value = page;
  changeCurrent(page);
}
const changeCurrent = (page) => {
  if (page !== 'design') {
    currentPage.value = page;
  }
}


//Nav Toggle
const navExpanded = ref(true);
const toggleNav = () => {
  navExpanded.value = !navExpanded.value;
}

const pagesToRender = computed(() => {
  const allPages = navigation.items.map(item => item.page);  
  const uniquePages = [...new Set(allPages.filter(page => page === activePage.value))];
  return uniquePages;
});


</script>

<template>
  <div class="installation-wrapper" data-view="main">
    <div :class="{ 'side-navigation': true, 'expanded': navExpanded == true }">
      <div class="side-navigation-wrapper">
        <MainNavigation :class="{ 'navigation': true, 'active': activePage !== 'design' }" @page-selected="changePage" :navigation="navigation" :activePage="activePage" @toggleNav="toggleNav"/>
        <Settings :class="{ 'settings': true, 'navigation': true, 'active': activePage == 'design' }" :settings="settings" :currentPage="currentPage" :fields="fields" @page-selected="changePage" @toggleNav="toggleNav"/>
      </div>
    </div>
    <div class="main">
      <div class="main-wrapper">
        <keep-alive>
          <View v-for="page in pagesToRender" :key="page" :src="page" class="view" :fields="fields" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<style>
#installation-app {
  max-height: 100vh;
}
.side-navigation-wrapper * {
  min-width:0;
}
.installation-wrapper .side-navigation-wrapper .navigation{
  transition: transform 0.3s ease;
  will-change: transform;
}
.installation-wrapper .side-navigation-wrapper:has( > .settings.active) .navigation  {
  transform: translateX(-400px);
  opacity: 1;
}

.fluid-engine .sqs-block{
  box-sizing: border-box;
}

.side-navigation.expanded .toggle-menu .open {
  display:none;
}
.side-navigation:not(.expanded) .toggle-menu .close {
  display:none;
}
</style>

<style scoped>
.installation-wrapper {
  display: grid;
  grid-template-columns: 1fr;
}

.main {
  position: relative;
  grid-row: 1;
  grid-column: 1;
  box-sizing: border-box;
  overflow-x: hidden;
  transition: margin 0.2s ease;
}
.main-wrapper{
  display: flex;
}

.view {
  display: flex;
  flex-direction:column;
  max-height: 100vh;
  overflow-y: auto;
  align-items: stretch;
  flex: 1 0 100%;
  position: relative;
}

.side-navigation {
  width: 400px;
  position: absolute;
  grid-row: 1;
  grid-column: 1;
  background: #121212;
  z-index: 9;
  border-right: 1px solid hsla(0, 0%, 20%, 1);
  box-shadow: 3px 3px 10px #1a1a1a40;
  box-sizing: border-box;
  overflow-x: hidden;
  transform: translateX(-328px);
  transition: transform 0.2s ease;
}
.side-navigation-wrapper {
  display: flex;
  transition: opacity 0.2s ease;
}

.navigation {
  display: grid;
  align-content: start;
  position: relative;
  flex: 1 0 100%;
  padding: 34px 27px 34px 34px;
  box-sizing: border-box;
  max-height: 100vh;
  overflow-y: auto;
}

.side-navigation:not(.expanded) .settings-wrapper * {
  opacity: 0;
}
.side-navigation.expanded {
  transform: translateX(0px);
}
.side-navigation.expanded + .main {
  margin-left: 400px;
}
.side-navigation:not(.expanded) + .main {
  margin-left: 72px;
}
</style>
