<template>
  <div class="app-container">
    <merchant-detail :is-edit='true'></merchant-detail>
  </div>
</template>
<script>
import merchantDetail from './components/merchantDetail'
export default {
  name: 'update_merchant',
  components: { merchantDetail }
}
</script>
<style scoped>

</style>

