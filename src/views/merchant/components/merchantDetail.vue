<template>
<el-form ref="form" :model="merchant" label-width="120px">
  </el-form-item>
  <el-form-item label="Name">
    <el-input v-model="merchant.name"></el-input>
  </el-form-item>
  <el-form-item label="Country">
    <el-select v-model="merchant.country" placeholder="请选择">
      <el-option
        v-for="item in countryOptions"
        :key="item.key"
        :label="item.display_name"
        :value="item.key">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Image">
    <upload :imageUrl.sync="imageList"></upload>
  </el-form-item>
  <el-form-item label="Has Aff">
    <el-select v-model="merchant.has_aff" placeholder="请选择">
      <el-option
        v-for="item in hasAffOptions"
        :key="item.key"
        :label="item.display_name"
        :value="item.key">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Dst Url">
    <el-input v-model="merchant.dst_url"></el-input>
  </el-form-item>
  <el-form-item label="Url Name">
    <el-input v-model="merchant.url_name"></el-input>
  </el-form-item>
  <el-form-item label="Facebook Url">
    <el-input v-model="merchant.facebook_url"></el-input>
  </el-form-item>
  <el-form-item label="Order">
    <el-input v-model="merchant.important_order"></el-input>
  </el-form-item>
  <el-form-item label="Description">
    <el-input
      type="textarea"
      placeholder="Description"
      v-model="merchant.description">
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { fetchMerchant, createMerchant, updateMerchant } from '@/api/merchant'
import upload from '@/components/Upload'
const countryOptions = [
  { key: 'US', display_name: 'US' },
  { key: 'UK', display_name: 'UK' },
  { key: 'AU', display_name: 'AU' },
  { key: 'CA', display_name: 'CA' }
]
const hasAffOptions = [
  { key: 'yes', display_name: 'YES' },
  { key: 'no', display_name: 'NO' }
]
const defaultMerchant = {
  id: undefined,
  name: '',
  image_url: '',
  country: 'US',
  has_aff: 'no',
  status: 'active',
  dst_url: '',
  url_name: '',
  facebook_url: '',
  important_order: 99,
  description: 'default description'
}

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.merchant = Object.assign({}, defaultMerchant)
    }
  },
  data() {
    return {
      imageList: [],
      merchant: Object.assign({}, defaultMerchant),
      countryOptions,
      hasAffOptions
    }
  },
  watch: {
    imageList: function(val) {
      if (val.length > 0) {
        this.merchant.image_url = val[0]
      }
    },
    'merchant.image_url': function(val) {
      this.imageList = [val]
    }
  },
  methods: {
    fetchData() {
      const params = { id: this.$route.params.id }
      fetchMerchant(params).then(response => {
        this.merchant = response.data.content
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit() {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    onCancel() {
      this.$router.go(-1)
    },
    create() {
      const that = this
      createMerchant(this.merchant).then(response => {
        if (response.data.message === 'success') {
          that.$message({
            message: response.data.content,
            type: 'success'
          })
          that.$router.go(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    update() {
      const that = this
      updateMerchant(this.merchant).then(response => {
        if (response.data.message === 'success') {
          that.$message({
            message: response.data.content,
            type: 'success'
          })
          that.$router.go(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    upload
  }
}
</script>