<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button type="primary" size="mini" @click="handleCreate()">CREATE</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" prop="id" label='ID' width="95">
      </el-table-column>
      <el-table-column align="center" label="Title">
        <template slot-scope="scope">
          {{scope.row.title}} <a href="javascript:;" @click="handleForwardMerchant(scope.row.merchant_id)"><el-tag>{{scope.row.merchant.name}}</el-tag></a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Promo Type">
        <template slot-scope="scope">
          <span>{{scope.row.promo_type}}| {{scope.row.promo_code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Dst Url">
        <template slot-scope="scope">
          <span>{{scope.row.dst_url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Start Time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.start_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Expire Time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.expire_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Created Time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operation" width="220" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">EDIT</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/coupon'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        merchant_id: this.$route.params.merchant_id
      },
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCreate() {
      this.$router.push('/coupon/create/merchant/' + this.listQuery.merchant_id)
    },
    handleEdit(id) {
      this.$router.push('/coupon/edit/' + id)
    },
    handleForwardMerchant(merchant_id) {
      this.$message('maintaining!')
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.content.data
        this.total = response.data.content.total
        this.listLoading = false
      })
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
    }
  }
}
</script>