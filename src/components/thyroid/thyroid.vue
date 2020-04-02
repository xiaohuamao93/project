<template>
    <div class="thyroid-page">
        <mt-button type="primary" size="large" @click="openDialog">添加</mt-button>
        <v-table
                is-horizontal-resize
                style="width:100%"
                :columns="columns"
                :table-data="list"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                @on-custom-comp="customCompFunc"
        ></v-table>
        <record-edit @close-popup="closePopup" @add-record="editRecord" :record="record" :popupVisible="popupVisible"/>
    </div>
</template>

<script>
    import { Toast, MessageBox } from 'mint-ui';
    import RecordEdit from './record/Record.vue';
    const Record = {
        num: 0,
        checkTime: '',
        tsh: '',
        FT3: '',
        FT4: '',
        TG: '',
        TT3: '',
        TRAb: '',
        TPOAb: '',
        TGAb: '',
        url: '',
        address: ''
    };
    export default {
        name: "Thyroid",
        components: {
            RecordEdit
        },
        data() {
            return {
                popupVisible: false,
                list: [],
                record: {},
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
                    {field: 'custome-adv', title: '操作',width: 100, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
                ]
            }
        },
        created() {
           this.getList();
        },
        methods: {
            openDialog() {
                this.popupVisible = true;
                this.record = Record;
            },
            closePopup() {
                this.popupVisible = false;
            },
            getList() {
                this.axios.get(this.$host + '/thyroid/list', {
                    params: {
                        removed: false
                    }
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
            editRecord(record) {
                let url = '';
                if (record.id) {
                    url = `edit/:${record.id}`;
                } else {
                    url = 'add';
                }
                this.axios.post(`${this.$host}/thyroid/${url}`, this.record)
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
            },
            customCompFunc(params) {
                if (params.type === 'edit') {
                    this.popupVisible = true;
                    this.record = params.rowData;
                } else {
                    MessageBox.confirm('确定要删除此条记录吗?').then(action => {
                        console.log('---action', action);
                        this.del(params.id);
                    });
                }
            },
            del(recordId) {
                this.axios.post(`${this.$host}/thyroid/:${recordId}`)
                    .then(res => {
                        let data = res.data;
                        if (data && data.code === 0) {
                            Toast(' 删除成功');
                            this.getList();
                        }
                    })
                    .catch(() => {
                        Toast('服务器异常');
                    })
            }
        }
    }

    import Vue from 'vue';
    // 自定义列组件
    Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            update(){
                let params = {type:'edit',index:this.index,rowData:this.rowData};
                this.$emit('on-custom-comp',params);
            },

            deleteRow(){
                let params = {type:'delete',index:this.index};
                this.$emit('on-custom-comp',params);

            }
        }
    })
</script>

<style lang="stylus">
    @import "./thyroid.styl";
</style>
