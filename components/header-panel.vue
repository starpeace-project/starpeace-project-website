<template lang='pug'>
nav#primary-navbar.navbar.is-transparent(:class='navbar_scroll_class')
  .navbar-brand
    a.navbar-item(href='/')
      img(src='~assets/images/project-logo-small.png')
    a.navbar-item.brand-bold(href='/') STARPEACE
    a.navbar-item(href='/') Project

  .navbar-menu
    .navbar-start
      a.navbar-item(href='/information/about') About Project
      .navbar-item.has-dropdown.is-hoverable
        a.navbar-link(href='/clients') Clients
        .navbar-dropdown.is-boxed
          a.navbar-item(href='https://www.starpeace.io', target='_blank') STARPEACE
          a.navbar-item(href='http://www.starpeaceonline.com', target='_blank') StarPeace Online
      .navbar-item.has-dropdown.is-hoverable
        a.navbar-link(href='/community') Community
        .navbar-dropdown.is-boxed
          a.navbar-item(href='https://forums.starpeace-project.com') Forums
          a.navbar-item(href='https://discord.gg/TF9Bmsj', target='_blank') Discord Chatroom
      a.navbar-item(href='/information/history') History

    .navbar-end
      a.navbar-item(href='/contribute/collaborate') Contribute
      a.navbar-item(href='/faq/common') FAQs
      a.navbar-item(href='https://docs.starpeace.io') Documentation
      a.navbar-item(href='https://twitter.com/starpeace_io', target='_blank')
        font-awesome-icon(:icon="['fab', 'twitter']")
      a.navbar-item(href='https://github.com/starpeace-project/starpeace-project-website', target='_blank')
        font-awesome-icon(:icon="['fab', 'github']")
</template>

<script lang='coffee'>
export default
  mounted: ->
    window.addEventListener('scroll', (event) =>
      @scroll_y = window.scrollY
    )

  data: ->
    scroll_y: 0

  computed:
    navbar_scroll_class: -> if @scroll_y > 150 then 'floating-navbar' else ''
</script>

<style lang='sass' scoped>
@import '~bulma/sass/utilities/_all'

$sp-primary: #6ea192
$sp-primary-bg: #395950

$sp-primary-dark: darken($sp-primary, 25%)

$sp-primary-light: lighten($sp-primary, 10%)
$sp-primary-extra-light: lighten($sp-primary, 30%)

$sp-primary-bg-light: lighten($sp-primary, 25%)
$sp-primary-bg-extra-light: lighten($sp-primary-bg-light, 20%)

@keyframes slide
  0%
    transform: translate(0, -100%)
  100%
    transform: translate(0, 0)

nav
  border-bottom: 2px solid $sp-primary-bg
  font-size: 1.25rem

  &.floating-navbar
    +desktop
      -webkit-animation: slide .5s ease 1
      -moz-animation: slide .5s ease 1
      animation: slide .5s ease 1
      position: fixed
      width: 100%

  .navbar-link
    &::after
      border-color: $sp-primary-dark

  .navbar-brand
    +tablet
      margin-right: 3rem

    img
      margin: 0 .25rem 0 .5rem
      height: 3.25rem
      max-height: 3.25rem
      vertical-align: middle

      +mobile
        height: 3rem
        max-height: 3rem

    a
      color: $sp-primary-dark
      font-family: 'Open Sans', sans-serif
      font-size: 2.25rem
      font-weight: bold
      line-height: 2.25rem
      margin: .25rem .25rem .5rem
      vertical-align: middle
      padding: 0

      +mobile
        font-size: 2rem
        line-height: 2rem

      &.brand-bold
        font-family: 'Varela Round', sans-serif
        font-size: 3rem
        letter-spacing: .5rem
        line-height: 3rem
        text-shadow: 0 0 .75rem opacify($sp-primary-dark, .8)

        +mobile
          font-size: 2.5rem
          line-height: 2.5rem

  .navbar-menu
    a
      color: $sp-primary-dark

      &:hover
        color: $sp-primary

  .navbar-dropdown
    background-color: $sp-primary-bg-extra-light

    .navbar-item
      font-size: 1.25rem
      padding: 1rem
      transition-duration: .25s
      transition-property: font-size, margin-left, margin-right

      &:hover
        background-color: $sp-primary-extra-light !important
        border-radius: 3px
        box-shadow: 0 8px 8px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1)
        font-size: 1.4rem
        margin-left: -.5rem
        margin-right: -.5rem

      &:active
        background-color: $sp-primary-light !important

  .language-select
    .navbar-item
      .flag-icon
        margin-right: .5rem
</style>
