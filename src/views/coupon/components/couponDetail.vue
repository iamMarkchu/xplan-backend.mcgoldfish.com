<template>
<el-form ref="form" :model="coupon" label-width="120px">
  </el-form-item>
  <el-form-item label="Merchant">
    <el-col :span="12">
      <el-tag>{{coupon.merchant.name}}</el-tag>
    </el-col>
  </el-form-item>
  <el-form-item label="Title">
    <el-col :span="12">
      <el-input v-model="coupon.title"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Promo Type">
    <el-col :span="8">
      <el-switch
        v-model="coupon.promo_type"
        active-text="CODE"
        inactive-text="DEAL"
        active-value="code"
        inactive-value="deal">
      </el-switch>
    </el-col>
  </el-form-item>
  <el-form-item label="Code" v-show="coupon.promo_type == 'code'">
    <el-col :span="8">
      <el-input v-model="coupon.promo_code"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Remark">
    <el-col :span="12">
      <el-input
        type="textarea"
        placeholder="Remark"
        v-model="coupon.remark">
      </el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Start & Expires">
    <el-date-picker
      v-model="pickerDate"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="~"
      start-placeholder="start time"
      end-placeholder="expire time"
      align="right">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="Dst Url">
    <el-col :span="12">
      <el-input v-model="coupon.dst_url"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="Restrict">
    <el-col :span="12">
      <el-input
        type="textarea"
        placeholder="Restrict"
        v-model="coupon.restrict">
      </el-input>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { createCoupon, fetchCoupon, updateCoupon } from '@/api/coupon'
import { fetchMerchant } from '@/api/merchant'
import { parseTime } from '@/utils'
import upload from '@/components/Upload'
const tags = [
  'Site wide',
  'Free Sample',
  'Free Shipping',
  'Free Trial'
]
const tagOptions = tags.map(function(item, index) {
  return { value: index, label: item }
})
const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}
const defaultCoupon = {
  merchant: { name: '' },
  id: undefined,
  merchant_id: undefined,
  title: '',
  promo_type: 'deal',
  promo_code: '',
  remark: '',
  start_at: '2017-12-10 00:00:00',
  expire_at: '2017-12-30 00:00:00',
  dst_url: '',
  restrict: '',
  editor: ''
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
      const merchant_id = this.$route.params.merchant_id
      this.coupon = Object.assign(defaultCoupon, { merchant_id: merchant_id })
      this.fetchMerchantData(merchant_id)
    }
  },
  data() {
    return {
      tagOptions,
      pickerOptions,
      pickerDate: '',
      coupon: defaultCoupon
    }
  },
  watch: {
    pickerDate: function(val) {
      this.coupon.start_at = parseTime(val[0])
      this.coupon.expire_at = parseTime(val[1])
    }
  },
  methods: {
    fetchData() {
      const params = { id: this.$route.params.id }
      fetchCoupon(params).then(response => {
        this.coupon = response.data.content
        this.pickerDate = [this.coupon.start_at, this.coupon.expire_at]
      })
    },
    fetchMerchantData(merchant_id) {
      const params = { id: merchant_id }
      fetchMerchant(params).then(response => {
        this.coupon.merchant.name = response.data.content.name
      }).catch(error => {
        console.log(error)
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
      createCoupon(this.coupon).then(response => {
        if (response.data.message === 'success') {
          this.$message({
            message: response.data.content,
            type: 'success'
          })
          this.$router.go(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    update() {
      updateCoupon(this.coupon).then(response => {
        if (response.data.message === 'success') {
          this.$message({
            message: response.data.content,
            type: 'success'
          })
          this.$router.go(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleTagChange() {
      console.log(this.coupon.tags)
    }
  },
  components: {
    upload
  }
}
</script>