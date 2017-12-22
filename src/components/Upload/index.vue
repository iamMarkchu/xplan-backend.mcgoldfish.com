<template>
  <el-upload
    name="uploadFile"
    :headers="headers"
    :action="uploadUrl"
    :on-success="success"
    :on-remove="remove"
    :multiple='false'
    :file-list="previewList"
    list-type="picture-card">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
import { deleteImage, UploadRequestPath } from '@/api/upload'
export default {
  name: 'upload',
  props: ['imageUrl'],
  data() {
    return {
      uploadUrl: UploadRequestPath,
      headers: {
        Accept: 'application/json',
        Authorization: getToken()
      },
      previewList: []
    }
  },
  methods: {
    success(response, file, fileList) {
      this.emitImage(fileList)
    },
    remove(file, fileList) {
      // 删除服务器上物理位置图片
      const param = {
        uploadFile: file.response
      }
      deleteImage(param)
      // 重新更新imageUrl
      this.emitImage(fileList)
    },
    emitImage(fileList) {
      const imageUrl = fileList.map(function(item) {
        return item.response
      })
      this.$emit('update:imageUrl', imageUrl)
    }
  },
  watch: {
    imageUrl(val) {
      if (val.length > 0) {
        this.previewList = [{ name: 'pic', url: process.env.BASE_API + val }]
      }
    }
  }
}
</script>

<style scoped>

</style>
