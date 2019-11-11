<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>username: {{msg2.username}}</p>
    <p>password: {{msg2.password}}</p>
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
        msg2: ''
      }
  },
  created() {
    this.axios.get(host + '/users')
            .then(res => {
              this.msg2 = res.data;
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
