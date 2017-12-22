<template>
  <div class="app-container">
    <coupon-detail :is-edit='true'></coupon-detail>
  </div>
</template>

<script>
import couponDetail from './components/couponDetail'
export default {
  name: 'edit_merchant',
  components: { couponDetail }
}
</script>
<style scoped>
</style>