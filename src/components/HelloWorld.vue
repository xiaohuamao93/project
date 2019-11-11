<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import host from '../../utils/address';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {

      }
  },
  created() {
    this.axios.get(host + '/users')
            .then(res => {
              console.log('--res', res);
            })
            .catch(err => {
              console.log('---err', err);
            })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
