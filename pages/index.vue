<template lang='haml'>
.column.column-main-body
  .hero.is-primary.is-medium.sp-primary-bg-animation.is-clearfix
    .hero-body
      .container.is-fluid
        %h1.title
          Welcome to STARPEACE Project!
        %h2.subtitle
          Player and Developer Community for STARPEACE: the real-time city-building economic simulation and cooperative multiplayer game
  .columns
    .column
      .box
        %p.title Announcements
    .column.is-narrow.has-text-centered
      .box.has-background-primary
        %img{':src':'building_image_path()'}
    .column
      .box
        %p.title Recent Discussions

</template>

<script lang='coffee'>
export default
  category: 'homepage'

  methods:
    building_image_path: ->
      "/assets/img/building-#{Math.floor(Math.random() * 5) + 1}.gif"
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

.hero
  margin-bottom: 1rem


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
