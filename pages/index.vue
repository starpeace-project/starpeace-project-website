<template lang='pug'>
.column.column-main-body
  .hero.is-primary.is-medium.sp-primary-bg-animation.is-clearfix.box
    .hero-body
      .container.is-fluid
        h1.title Welcome to STARPEACE Project!
        h2.subtitle Player and Developer Community for STARPEACE: the real-time city-building economic simulation and cooperative multiplayer game

  .column.is-paddingless
    .box.has-background-primary.has-text-centered
      img(:src='building_image_path()')

</template>

<script lang='coffee'>

recent_discussions = []

export default
  category: 'homepage'

  data: ->
    recent_discussions: []

  methods:
    building_image_path: -> "assets/img/building-#{Math.floor(Math.random() * 5) + 1}.gif"
</script>

<style lang='sass' scoped>
@import '~bulma/sass/utilities/_all'

$sp-primary: #6ea192
$sp-primary-bg: #395950
$sp-dark-bg: #2a453f

.hero
  margin-bottom: 1rem

.box
  > .title
    border-bottom: 1px solid $sp-primary
    margin-bottom: .75rem
    padding-bottom: .5rem

    a
      color: $black-ter

      &:hover
        color: $sp-primary

.recent-discussions
  .forum-item-title
    font-weight: bold
    font-size: 1.3rem

    a
      color: darken($sp-primary, 25%)

      &:hover
        color: $sp-primary

      &:active
        color: #000

  .forum-item-info
    color: #888
    font-weight: 250
    margin-top: .1rem

  .forum-item-body
    border-top: 1px solid rgba(219, 219, 219, .4)
    margin-top: .5rem
    padding-top: .5rem

</style>
