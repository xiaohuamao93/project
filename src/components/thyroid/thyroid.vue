<template>
    <div class="thyroid-page">
        <mt-button type="primary" size="large" @click="openDialog">添加</mt-button>
        <v-table
                is-horizontal-resize
                style="width:100%"
                :columns="columns"
                :table-data="tableData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
        ></v-table>
        <mt-popup v-model="popupVisible" position="right" class="popup-class">
            <div >
                <mt-field label="次数" placeholder="次数" v-model="record.num"></mt-field>
                <mt-datetime-picker
                        ref="picker"
                        type="time"
                        v-model="record.checkTime">
                </mt-datetime-picker>
                <mt-field label="次数" placeholder="次数" v-model="record.num"></mt-field>
                <mt-field label="促甲状腺激素(tsh)" placeholder="tsh" v-model="record.tsh"></mt-field>
                <mt-field label="游离三碘甲腺原氨酸(FT3)" placeholder="FT3" v-model="record.FT3"></mt-field>
                <mt-field label="游离甲状腺素(FT4)" placeholder="FT4" v-model="record.FT4"></mt-field>
                <mt-field label="甲状腺球蛋白(TG)" placeholder="TG" v-model="record.TG"></mt-field>
                <mt-field label="三碘甲状腺原氨酸" placeholder="TT3" v-model="record.TT3"></mt-field>
                <mt-field label="促甲状腺素受体抗体" placeholder="TRAb" v-model="record.TRAb"></mt-field>
                <mt-field label="甲状腺过氧化物酶抗体" placeholder="TPOAb" v-model="record.TPOAb"></mt-field>
                <mt-field label="抗甲状腺球蛋白抗体" placeholder="TGAb" v-model="record.TGAb"></mt-field>
                <mt-field label="图片" placeholder="url" v-model="record.url"></mt-field>
                <mt-field label="地址" placeholder="address" v-model="record.address"></mt-field>
            </div>
            <mt-button type="primary" size="large" @click="addRecord">添加</mt-button>
        </mt-popup>
    </div>
</template>

<script>
    import { Toast  } from 'mint-ui';
    export default {
        name: "Thyroid",
        components: {
        },
        data() {
            return {
                popupVisible: false,
                list: [],
                record: {},
                tableData: [
                    {"name":"赵伟","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                    {"name":"李伟","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                    {"name":"孙伟","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                    {"name":"周伟","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                    {"name":"吴伟","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"}
                ],
                columns: [
                    {field: 'num', title: '次数', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'checkTime', title: '检查时间', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'tsh', title: '促甲状腺激素(tsh)', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'FT3', title: '游离三碘甲腺原氨酸(FT3)', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'FT4', title: '游离甲状腺素(FT4)', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'TG', title: '甲状腺球蛋白(TG)', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'TT3', title: '三碘甲状腺原氨酸', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'TRAb', title: '促甲状腺素受体抗体', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'TPOAb', title: '甲状腺过氧化物酶抗体', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'TGAb', title: '抗甲状腺球蛋白抗体', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'url', title: '图片', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'address', title: '地址', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
                ]
            }
        },
        created() {
           this.getList();
        },
        methods: {
            openDialog() {
                this.popupVisible = true;
            },
            getList() {
                this.axios.get(this.$host + '/thyroid/list', {

                })
                    .then(res => {
                        let data = res.data;
                        if (data && data.code === 0) {
                            this.list = data.result;
                        } else {
                            Toast('err');
                        }
                    })
                    .catch(() => {
                        Toast('err');
                    })
            },
            addRecord() {
                this.axios.post(this.$host + '/thyroid/add', this.record)
                    .then(res => {
                        let data = res.data;
                        if (data && data.code === 0) {
                            Toast('添加成功');
                            this.getList();
                        }
                    })
                    .catch(() => {
                        Toast('服务器异常');
                    })
            }
        }
    }
</script>

<style lang="stylus">
    @import "./thyroid.styl";
</style>
