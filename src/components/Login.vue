<template>
  <div class="login-wrap">
    <div class="input-wrap">
      <div class="input-item bor-bottom">
        <span class="user-icon"></span>
        <mt-field placeholder="请输入用户名" v-model="username"></mt-field>
      </div>
      <div class="input-item">
        <span class="pass-icon"></span>
        <mt-field placeholder="请输入密码" type="password" v-model="password" @keyup="keyupSearch"></mt-field>
      </div>
      <div class="btn-txt-wrap">
        <a class="txt" href="">注册账户</a>
        <a class="red-txt txt">忘记密码</a>
      </div>
    </div>
    <mt-button type="primary" size="large" @click.native.enter="handleClick">登录</mt-button>
  </div>
</template>

<script>
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
    let user = this.$util.session.get('user');
    if (user && user._id) {
      return this.$router.push('/home');
    } else {
      this.axios.get(this.$host + '/api/user')
          .then(res => {
            let result = res.data;
            if (result.code === 0 && result.data.user) {
              return this.$router.push('/home');
            }
          })
          .catch(() => {
            Toast({
              message: '自动登录失效',
              iconClass: 'icon icon-error'
            });
          })
    }
  },
  methods: {
    keyupSearch: function (evt) {
      var code = evt.keyCode || evt.charCode;
      if (code === 13) this.handleClick();
    },
    handleClick() {
      let {username, password} = this;
      let user = {
        username,
        password
      };
      this.axios.post(this.$host + '/api/login', user)
              .then(res => {
                if (res.data && res.data.code === 0) {
                  this.$util.session.set('user', res.data.result);
                  Toast({
                    message: '登录成功',
                    iconClass: 'icon icon-success'
                  });
                  return this.$router.push('/home');
                }
                Toast({
                  message: '登录失败',
                  iconClass: 'icon icon-error'
                });
              })
              .catch(err => {
                console.log('---err', err);
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .mint-cell:last-child {
    background: none;
  }
  .mint-cell-wrapper {
    background-image: none !important;
  }
  .login-wrap {
    padding: 2rem .3rem 0;
  }
  /*.bor-bottom {*/
  /*  border-bottom: 1px solid #bbb;*/
  /*}*/
  .input-wrap {
    margin-bottom: .5rem;
  }
  .input-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bbb;
  }
  .user-icon {
    width: .24rem;
    height: .24rem;
    margin-right: .1rem;
    background: url("../assets/user_name.png") no-repeat;
    background-size: contain;
  }
  .pass-icon {
    width: .24rem;
    height: .24rem;
    margin-right: .1rem;
    background: url("../assets/password.png") no-repeat;
    background-size: contain;
  }
  .btn-txt-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: .4rem;
  }
  .btn-txt-wrap .txt {
    text-decoration: underline !important;
    color: #666;
  }
  .btn-txt-wrap .red-txt {
    color: red;
  }
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
