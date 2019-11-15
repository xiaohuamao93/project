<template>
    <div class="page-field">
        <div class="page-title">Field</div>
        <div class="page-part">
            <mt-field label="用户名" placeholder="请输入用户名" :attr="{ maxlength: 10 }"></mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
        </div>
        <div class="page-part">
            <mt-button type="danger" size="large" @click.native.enter="signOut">退出</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "mine",
        data() {
            return {

            }
        },
        created() {

        },
        methods:  {
            signOut() {
                this.$util.session.remove('user');
                this.axios.post(this.$host + '/api/signout', {})
                    .then(res => {
                        let {data} = res;
                        if (data && data.code === 0) {
                            Toast('退出成功！');
                            return this.$router.push('/login');
                        }
                        Toast('退出失败');
                    })
                    .catch(err => {
                        Toast(err);
                    });
            }
        }
    }
</script>

<style scoped>
    @import "./mine.styl";
</style>
