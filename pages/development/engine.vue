<template lang='pug'>
.column.column-main-body(v-cloak=true)
  .card
    .card-content
      h2.title Simulation Engine
</template>

<script lang='coffee'>
export default
  category: 'development.engine'
</script>

<style lang='sass' scoped>
h3
  margin-top: 2rem

h2
  + h3
    margin-top: .5rem
</style>
