<template>
    <div class="home-page">
        <mt-tabbar v-model="selected">
            <mt-tab-item id="home">
                <img slot="icon" src="../../assets/home.png" />
                首页
            </mt-tab-item>
            <mt-tab-item id="record">
                <img slot="icon" src="../../assets/gift.png" />
                记录
            </mt-tab-item>
            <mt-tab-item id="my">
                <img slot="icon" src="../../assets/account.png" />
                我的
            </mt-tab-item>
        </mt-tabbar>

        <mt-tab-container class="page-tabbar-container" v-model="selected">
            <mt-tab-container-item id="home">
                <upload-file></upload-file>
            </mt-tab-container-item>
            <mt-tab-container-item id="record">
                <picture-vue></picture-vue>
            </mt-tab-container-item>

            <mt-tab-container-item id="my">
               <mine-vue></mine-vue>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>

</template>

<script>
    import uploadFile from '../uploadFile/uploadFile.vue';
    import mineVue from '../mine/mine.vue';
    import pictureVue from '../picture';
    export default {
        name: "Home",
        components: {uploadFile, mineVue, pictureVue},
        data() {
            return {
                selected: 'home'
            }
        }
    }
</script>

<style scoped>
    @import "./home.styl";
</style>
