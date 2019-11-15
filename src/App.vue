<template>
  <div id="app">
    <router-link class="page-back" v-if="visible" :to="'/'">
      <i class="mintui mintui-back"></i>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    visible() {
      return ['/', '/home', '/search', '/login'].indexOf(this.$route.path) < 0;
    }
  }
}
</script>

<style>
  body {
    background-color: #fafafa;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


  .page-demo {
    padding-bottom: 50px;
  }
  .page-demo .indexicon {
    font-size: 22px;
    color: #26a2ff;
    display: inline-block;
    width: 30px;
    vertical-align: middle
  }
  .page-demo .indexicon.icon-swipe {
    font-size: 26px;
  }
  .page-demo .indexicon.icon-checklist {
    font-size: 18px;
  }
  .page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }
  .page-part {
    margin-bottom: 15px;
  }

</style>
