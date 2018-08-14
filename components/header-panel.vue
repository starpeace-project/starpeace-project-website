<template lang='haml'>
  %nav.navbar.is-transparent
    .navbar-brand
      %a.navbar-item{href: '/'}
        %img{src: '~/assets/images/project-logo-small.png'}
      %a.navbar-item.brand-bold{href: '/'} STARPEACE
      %a.navbar-item{href: '/'} Project
      .navbar-burger.burger{'data-target':'primary-navbar'}
        %span
        %span
        %span

    #primary-navbar.navbar-menu
      .navbar-start
        %a.navbar-item{href:'/'} Home
        .navbar-item.has-dropdown.is-hoverable
          %a.navbar-link{href:'/clients'} Clients
          .navbar-dropdown.is-boxed
            %a.navbar-item{href:'https://www.starpeace.io', target:'_blank'}
              STARPEACE.io
            %a.navbar-item{href:'http://www.starpeaceonline.com', target:'_blank'}
              StarPeace Online
        .navbar-item.has-dropdown.is-hoverable
          %a.navbar-link{href:'/community'} Community
          .navbar-dropdown.is-boxed
            %a.navbar-item{href:'https://forums.starpeace-project.com'}
              Forums
            %a.navbar-item{href:'https://discord.gg/TF9Bmsj', target:'_blank'}
              Discord Chatroom
        %a.navbar-item{href:'/information/about'} About Project
        %a.navbar-item{href:'/information/history'} History

      .navbar-end
        %a.navbar-item{href:'/contribute/support'} Contribute
        %a.navbar-item{href:'/faq/about'} FAQs
        %a.navbar-item{href:'https://docs.starpeace.io'} Documentation
        %a.navbar-item{href:'https://twitter.com/starpeace_io', target:'_blank'}
          %font-awesome-icon{':icon':"['fab', 'twitter']"}
        %a.navbar-item{href:'https://github.com/starpeace-project/starpeace-project-website', target:'_blank'}
          %font-awesome-icon{':icon':"['fab', 'github']"}
</template>

<style lang='sass' scoped>
$sp-primary: #6ea192
$sp-primary-bg: #395950

$sp-primary-dark: darken($sp-primary, 25%)

$sp-primary-light: lighten($sp-primary, 10%)
$sp-primary-extra-light: lighten($sp-primary, 30%)

$sp-primary-bg-light: lighten($sp-primary, 25%)
$sp-primary-bg-extra-light: lighten($sp-primary-bg-light, 20%)

nav
  border-bottom: 2px solid $sp-primary-bg
  font-size: 1.25rem

  .navbar-link
    &::after
      border-color: $sp-primary-dark

  .navbar-brand
    margin-right: 3rem

    img
      margin: 0 .25rem 0 .5rem
      height: 3.25rem
      max-height: 3.25rem
      vertical-align: middle

    a
      color: $sp-primary-dark
      font-family: 'Open Sans', sans-serif
      font-size: 2.25rem
      font-weight: bold
      line-height: 2.25rem
      margin: .25rem .25rem .5rem
      vertical-align: middle
      padding: 0

      &.brand-bold
        color: #000
        font-family: 'Varela Round', sans-serif
        font-size: 3rem
        letter-spacing: .5rem
        line-height: 3rem
        text-shadow: 0 0 .75rem opacify($sp-primary-dark, .8)

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
</style>
