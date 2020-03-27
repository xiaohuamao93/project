<template>
    <div class="img-list-wrap">
        <mt-button type="primary" size="large" @click="toUrl">查看记录</mt-button>
        <ul class="img-list">
            <li class="img-item" v-for="(file, index) in pictures" :key="index">
                <img class="img" :src="file.url"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "picture",
        components: {

        },
        data() {
            return {
                pictures: [],
                count: 0
            }
        },
        created() {
            this.axios.get(`${this.$host}/picture/list`, {
                params: {
                    skip: 0,
                    limit: 10
                }
            })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 0) {
                        this.pictures = data.result;
                    } else {
                        Toast('err');
                    }
                })
                .catch(err => {
                    Toast(err);
                });
            this.axios.get(`${this.$host}/picture/count`, {
                params: {

                }
            })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 0) {
                        this.count = data.count;
                    } else {
                        Toast('获取文件数量失败');
                    }
                })
                .catch(err => {
                    Toast(err);
            })
        },
        methods: {
            toUrl() {
                this.$router.push('/thyroid');
            },
            deleteFile(id) {
                this.axios.post(`${this.$host}/picture/delete/${id}`)
                    .then(res => {
                        let data = res.data;
                        if (data && data.code === 0) {
                            Toast('删除成功')
                        } else {
                            Toast('删除失败');
                        }
                    })
                    .catch(err => {
                        Toast(err);
                    })
            }
        }
    }
</script>

<style scoped>
    .img-list {
        display: flex;
        flex-wrap: wrap;
    }
    .img-item {
        width: 1.48rem;
        height: 1.48rem;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-color: #fbfdff;
    }
    .el-upload--picture-card {
        border: 1px dashed #c0ccda;
        box-sizing: border-box;
        cursor: pointer;
        vertical-align: top;
    }
    .add-img {
        width: .48rem;
        height: .48rem;
    }
    .img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>
