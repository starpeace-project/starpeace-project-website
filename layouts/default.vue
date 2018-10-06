<template lang='haml'>
%no-ssr
  #application-container{'v-cloak':true}
    %sp-header
    #application-body.columns
      %sp-menu{'v-bind:category':'category'}
      %nuxt
    %sp-footer
</template>

<script lang='coffee'>
import Header from '~/components/header-panel.vue'
import Menu from '~/components/menu-panel.vue'
import Footer from '~/components/footer-panel.vue'

export default
  components:
    'sp-header': Header
    'sp-menu': Menu
    'sp-footer': Footer

  computed:
    category: () -> @$route.matched.map((r) -> r.components.default.options?.category || r.components.default.category)[0]
</script>

<style lang='sass'>
html
  font-size: 12px
  overflow-y: scroll

body
  box-sizing: border-box
  color: #000
  font-family: 'Open Sans', sans-serif
  font-size: 12px
  margin: 0
  padding: 0

#application-container
  display: grid
  grid-template-columns: auto
  grid-template-rows: 4rem auto 11rem

  @media screen and (max-width: 768px)
    display: inline-block

    #common-header
      display: inline-block
      width: 100%

  #application-body
    grid-column-start: 1
    grid-column-end: 2
    grid-row-start: 2
    grid-row-end: 2
    margin: 0
</style>
