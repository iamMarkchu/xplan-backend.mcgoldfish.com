<template>
  <div class="app-container">
    <merchant-detail :is-edit='false'></merchant-detail>
  </div>
</template>

<script>
import merchantDetail from './components/merchantDetail'
export default {
  name: 'create_merchant',
  components: { merchantDetail }
}
</script>
<style scoped>
</style>

