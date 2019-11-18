<template>
    <div>
        <input class="not-show" ref="upload" @change="attachFile" type="file" multiple="multiple" accept="image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/3gpp"/>
        <div class="img-list-wrap">
            <ul class="img-list">
                <li class="img-item el-upload--picture-card" @click="selectedMats">
                    <img class="add-img" slot="icon" src="../../assets/add.png">
                </li>
                <li class="img-item" v-for="(file, index) in uploadMats" :key="index">
                    <img class="img" :src="file.url"/>
                    <mt-progress :value="file.progress" v-if="!file.isUpload" transition="progress-fade">
                        <div slot="end">{{ file.progress }}%</div>
                    </mt-progress>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "uploadFile",
        data() {
            return {
                uploadMats: [],
                showProgress: false
            }
        },
        created() {
            this.user = this.$util.session.get('user');
        },
        methods: {
            attachFile(evt) {
                let fileArr = evt.target.files;
                let matsArr = [];
                let fileLength = fileArr.length;
                for (let i = 0; i < fileLength; i++) {
                    let file = fileArr[i];
                    let fileType = file.type.split('/')[0];
                    let fileWrap = {
                        type: fileType,
                        url: this.getUrl(fileArr[i]),
                        file,
                        name: file.name,
                        isUpload: false,
                        progress: 0
                    };
                    matsArr.push(fileWrap);
                }
                this.uploadMats = this.uploadMats.concat(matsArr);
                this.uploadFile();
            },

            selectedMats() {
                this.$refs.upload.click();
            },

            getUrl (file) {
                return URL.createObjectURL(file);
            },

            uploadFile() {
                if (this.showProgress) return;
                let self = this;
                let mats = [];
                this.uploadMats.forEach((item, index) => {
                    if (!item.isUpload) {
                        mats.push({
                            index,
                            file: item.file
                        });
                    }
                });
                if (mats.length === 0) return Toast('请选择需要上传的视频或图片');
                // let loadingMasks = [];
                this.showProgress = true;
                const url = this.$host + '/api/upload';
                this.$async.each(mats, (mat, callback) => {
                    let {file, index} = mat;
                    let param = new FormData();
                    param.append('file', file, file.name);
                    param.append('uploader', this.user._id);
                    param.append('source', "test");
                    let progress = 0;
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'user-id': this.user._id
                        },
                        onUploadProgress (progressEvent) {
                            if (progressEvent.lengthComputable) {
                                progress = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
                                self.uploadMats[index].progress = parseInt(progress);
                                // if (progressEvent.loaded === progressEvent.total) {
                                //     let target = $('.mat-detail')[index];
                                //     loadingMasks[index] = self.$loading({
                                //         target: target,
                                //         text: '上传完成，处理中...'
                                //     });
                                // }
                            }
                        }
                    };
                    console.log('---param', param);
                    this.axios.post(url, param, config)
                        .then(res => {
                            let result = res.data;
                            if (result && result.code === 0) {
                                this.uploadMats[index].isUpload = true;
                                callback();
                            } else {
                                callback('err');
                            }
                            // if (loadingMasks[index]) loadingMasks[index].close();
                        })
                        .catch(err => {
                            // if (loadingMasks[index]) loadingMasks[index].close();
                            callback(err);
                        });
                }, (err, res) => {
                    this.showProgress = false;
                    if (err) {
                        return Toast('上传失败');
                    }
                    console.log('--res', res);
                    Toast('上传成功')
                });
            }
        }
    }
</script>

<style scoped>
    .not-show {
        display: none;
    }
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
    .el-icon-plus {
        font-size: 12px;
        color: #8c939d;
    }
    .el-icon-plus:before {
        content: "\e6d9";
    }
</style>
