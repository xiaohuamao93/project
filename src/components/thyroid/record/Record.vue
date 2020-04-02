<template>
    <mt-popup v-model="popupVisible" position="right" class="popup-class">
        <div >
            <mt-field label="次数" placeholder="次数" v-model="record.num"></mt-field>
            <mt-datetime-picker
                    ref="picker"
                    v-model="record.checkTime"
                    :closeOnClickModal="false"
                    @visible-change="handleVisibleChange"
                    @confirm="handleChange">
            </mt-datetime-picker>
            <mt-button @click.native="open('picker')" size="large">点击设置时间</mt-button>
<!--            <mt-field label="次数" placeholder="次数" v-model="record.num"></mt-field>-->
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
        <div class="btn-wrap">
            <mt-button type="primary" class="submit-btn" size="small" @click="addRecord">添加</mt-button>
            <mt-button type="danger" size="small" @click="close">取消</mt-button>
        </div>
    </mt-popup>
</template>

<script type="text/ecmascript-6">
    import {Toast} from 'mint-ui';
    export default {
        name: "Record",
        props: {
            record: {
                type: Object
            },
            popupVisible: {
                type: Boolean
            }
        },
        data(){
            return {

            }
        },
        methods: {
            close() {
                this.$emit('close-popup');
            },
            addRecord() {
                 this.$emit('add-record', this.record);
            },
            open(picker) {
                this.$refs[picker].open();
            },
            handleChange(value) {
                console.log('===valuie', value);
                Toast(`已选择${value.toString()}`)
                // Toast({
                //     message: '已选择 ' + value.toString(),
                //     position: 'bottom'
                // });
            },

            handleVisibleChange(isVisible) {
                console.log('弹窗是否展示:', isVisible);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
