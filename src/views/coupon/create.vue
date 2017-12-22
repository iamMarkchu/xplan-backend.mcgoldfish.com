<template>
  <div class="app-container">
    <coupon-detail :is-edit='false'></coupon-detail>
  </div>
</template>

<script>
import couponDetail from './components/couponDetail'
export default {
  name: 'create_merchant',
  components: { couponDetail }
}
</script>
<style scoped>
</style>