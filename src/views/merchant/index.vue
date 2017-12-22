<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button type="primary" size="mini" @click="handleCreate()">CREATE</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" prop="id" label='ID' width="95">
      </el-table-column>
      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Country">
        <template slot-scope="scope">
          <span>{{scope.row.country}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Has Aff">
        <template slot-scope="scope">
          <span>{{scope.row.has_aff}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Dst Url">
        <template slot-scope="scope">
          <span>{{scope.row.dst_url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Created_at">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operation" width="220" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">EDIT</el-button>
          <el-button type="default" size="mini" @click="handleCoupons(scope.row.id)">COUPONS</el-button>
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
import { getList } from '@/api/merchant'

export default {
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 20
      },
      listLoading: true,
      total: 0
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCreate() {
      this.$router.push('/merchant/create')
    },
    handleEdit(id) {
      this.$router.push('/merchant/edit/' + id)
    },
    handleCoupons(id) {
      this.$router.push('/coupon/index/merchant/' + id)
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.content.data
        this.total = response.data.content.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    }
  }
}
</script>