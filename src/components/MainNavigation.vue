<script setup>
import ChevronDoubleRight from './icons/ChevronDoubleRight.vue';
import ChevronDoubleLeft from './icons/ChevronDoubleLeft.vue';
const props = defineProps({
    navigation: {
        type: Object
    },
    activePage: {
        type: String
    }
})

const emit = defineEmits(['design-click', 'page-selected', 'toggleNav'])

const buttonClicked = async (page, scrollTo) => {

    emit('page-selected', page, scrollTo);
}

const handleClick = () => {
    emit('toggleNav');
}
</script>

<template>
    <div class="main-navigation">
        <div class="navigation-header">
            <h1><span style="display:block">Will-Myers</span><span>{{ navigation.title }}</span></h1>
            <div class="toggle-menu">
                <button @click="handleClick" aria-controls="close-tab" aria-selected="true" tabindex="0" class="close">
                    <div class="icon-container">
                        <ChevronDoubleLeft />
                    </div>
                </button>
                <button @click="handleClick" aria-controls="open-tab" aria-selected="false" tabindex="0" class="open">
                    <div class="icon-container">
                        <ChevronDoubleRight />
                    </div>
                </button>
            </div>
        </div>
        <div class="navigation-groups">
            <ul v-for="item in navigation.items" class="navigation-group">
                <li :class="{ 'page-item': true, 'active': item.page === activePage }">
                    <a @click="buttonClicked(item.page, '')">{{ item.title }}</a>
                    <ul v-if="item.subpages">
                        <li v-for="subItem in item.subpages" class="subpage-item">
                            <a @click="buttonClicked(item.page, subItem.scrollTo)">{{ subItem.title }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.navigation-groups{
    display:grid;
    gap:17px;
}
/* Reset */
ul {
    margin: 0;
    list-style: none;
    padding: 0;
}
li.page-item {
    color: white;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 1px;
}

li.page-item.active {
    color: var(--blue);
}

li.subpage-item {
    font-weight: 400;
    font-size: 18px;
    color: #ccc;

}
li.subpage-item:not(:last-child) {
    padding-bottom: 8px;
}

li > ul {
    padding-left: 17px;
    margin: 8px 0;
}




p {
    margin: 0;
}


p.link a:hover {
    color: white;
}

#installation-app p.link.active a {
    color: var(--blue);
}


#installation-app h1 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 1px;
    margin: 0;
}

.navigation-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4rem;
}

.toggle-menu {
    display: flex;
    justify-content: flex-end;
}

.toggle-menu button {
    background: none;
    border: 0;
    color: #fff;
    padding: 0;
    border-radius: 5px;
}

.toggle-menu .icon-container {
    width: 18px;
    padding: 4px;
    height: 18px;
    display: grid;
    place-items: center;
    cursor: pointer;
}
</style>

<style>
h1 span:nth-of-type(2) {
    font-size: 1.4rem;
}
</style>