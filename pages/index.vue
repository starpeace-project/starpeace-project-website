<template lang='haml'>
.column.column-main-body
  #welcome-banner.documentation-body.is-starpeace
    %p
      Welcome to the STARPEACE Project!
</template>

<script lang='coffee'>
export default
  category: 'homepage'
</script>

<style lang='sass' scoped>
$sp-primary: #6ea192
$sp-primary-bg: #395950
$sp-dark-bg: #2a453f

#application-body
  > div
    margin-right: 0

  .column
    &.is-6
      padding-right: 0

.banner
  color: #fff
  margin-bottom: 1.5rem
  text-align: center

  h1
    display: inline-block
    font-size: 6vw

  .starpeace-logo
    background-size: 4.4vw
    height: 4.4vw
    width: 4.4vw

  &.mobile
    h1
      font-size: 12vw

    .starpeace-logo
      background-size: 8.75vw
      height: 8.75vw
      width: 8.75vw

#sub-banner
  color: #fff
  margin-top: 2rem
  text-align: center

#demo-card
  background-color: $sp-primary-bg

  .card-content
    padding: 1rem

    img
      width: 100%

#demo-actions
  margin: 3rem 0

  a
    min-width: 10rem

#main-body-container
  background-color: #eee
  margin-bottom: 2rem
  padding-bottom: 2rem

  #main-body-banner
    margin-bottom: 4rem
    margin-top: 2rem
    text-align: center

    h2
      padding: 0 .5rem

    h3
      padding: 0 1rem

  .feature
    font-size: 1.2rem

  .feature-img-placeholder
    background-color: #ccc
    min-height: 10rem
</style>
