<template lang='haml'>
%no-ssr
  .column.column-main-body{'v-cloak':true}
    .card
      .card-content
        %h2.title Collaborate
</template>

<script lang='coffee'>
export default
  category: 'contribute.collaborate'
</script>

<style lang='sass' scoped>
h3
  margin-top: 2rem

h2
  + h3
    margin-top: .5rem
</style>
