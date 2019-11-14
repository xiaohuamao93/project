<template>
  <div class="hello">
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-button type="primary" size="large" @click.native="handleClick">登录</mt-button>
  </div>
</template>

<script>
  import host from '../../utils/address';
  import { Toast } from 'mint-ui';
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
      return {
        username: '',
        password: ''
      }
  },
  created() {

  },
  methods: {
    handleClick() {
      let {username, password} = this;
      let user = {
        username,
        password
      };
      this.axios.post(host + '/api/login', user)
              .then(res => {
                if (res.data && res.data.code === 0) {
                  Toast({
                    message: '登录成功',
                    iconClass: 'icon icon-success'
                  });
                }
                console.log('--res', res);
              })
              .catch(err => {
                console.log('---err', err);
              })
    }
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
