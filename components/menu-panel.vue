<template lang='haml'>
  .column.column-menu.is-one-quarter-tablet.is-one-quarter-desktop.is-one-fifth-widescreen.is-one-fifth-fullhd
    %aside.menu

      %ul.menu-list
        %p.menu-label
          Project News
      %a.twitter-timeline{href:"https://twitter.com/starpeace_io?ref_src=twsrc%5Etfw", target:'_blank', 'data-chrome':'noheader nofooter noborders noscrollbar', 'data-tweet-limit':1}

      %ul.menu-list
        %p.menu-label
          Game Clients

      .client-link.is-first
        .level.is-mobile.game-logo.is-spio
          %a.level-item.is-marginless{href:'https://client.starpeace.io'} STAR
          %a.level-item.logo-item{href:'https://client.starpeace.io'}
            %img.starpeace-logo
          %a.level-item.is-marginless{href:'https://client.starpeace.io'} PEACE
        .level.is-mobile.game-notes
          %a.level-left{href:'https://client.starpeace.io'} {{ client_version }}
          %a.level-right.release-notes{href:'https://client.starpeace.io/release'}
            %span.is-hidden-tablet-only
              Release&nbsp;
            Notes
      .client-link
        .level.game-logo.is-spo
          %a.level-item{href:'http://www.starpeaceonline.com/'}
        .level.game-notes
          %a.level-left{href:'http://www.starpeaceonline.com/support.asp'} Windows Client

      %ul.menu-list
        %p.menu-label
          Community
        %li
          %a{':class':"category == 'community.forums' ? 'is-active' : ''", href: 'https://forums.starpeace-project.com'} Forums
        %li
          %a{':class':"category == 'community.discord' ? 'is-active' : ''", href: 'https://discord.gg/TF9Bmsj', target:'_blank'} Discord Chatroom

        %p.menu-label
          Information
        %li
          %a{':class':"category == 'information.about' ? 'is-active' : ''", href:"/information/about"} About Project
        %li
          %a{':class':"category == 'information.history' ? 'is-active' : ''", href:"/information/history"} History
        %li
          %a{':class':"category == 'information.documentation' ? 'is-active' : ''", href:'https://docs.starpeace.io'} Documentation

        %p.menu-label
          Contribute
        %li
          %a{':class':"category == 'contribute.collaborate' ? 'is-active' : ''", href:"/contribute/support"} Collaborate
        %li
          %a{':class':"category == 'contribute.ledger' ? 'is-active' : ''", href:"/contribute/ledger"} Project Ledger

        %p.menu-label
          Development
        %li
          %a{':class':"category == 'development.overview' ? 'is-active' : ''", href:"/development/overview"} Overview and Roadmap
        %li
          %a{':class':"category == 'development.client' ? 'is-active' : ''", href:"/development/client"} Client
        %li
          %a{':class':"category == 'development.server' ? 'is-active' : ''", href:"/development/server"} Server
        %li
          %a{':class':"category == 'development.authentication' ? 'is-active' : ''", href:"/development/authentication"} Authentication

        %p.menu-label
          FAQs
        %li
          %a{':class':"category == 'faq.common' ? 'is-active' : ''", href:"/faq/common"} Common Questions

</template>

<script lang='coffee'>
export default
  props:
    category: String

  mounted: ->
    script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.body.appendChild(script)

  data: ->
    client_version: 'Client Latest Version'

  created: ->
    request = new XMLHttpRequest()
    request.open('GET', 'https://client.starpeace.io/assets/client-version.json', true)
    request.onload = () =>
      @client_version = "WebGL Client #{JSON.parse(request.responseText).version}" if request.status >= 200 && request.status < 400
    request.send()
</script>

<style lang='sass' scoped>
@import '~bulma/sass/utilities/_all'

$sp-primary: #6ea192
$sp-primary-bg: #395950

$sp-primary-light: lighten($sp-primary, 10%)
$sp-primary-extra-light: lighten($sp-primary, 30%)

.column-menu
  background-color: #eee
  min-width: 28rem
  padding: 0
  padding-bottom: 1rem

  .client-link
    background-color: lighten($sp-primary-extra-light, 15%)
    border: 1px solid lighten($sp-primary-bg, 15%)
    margin: 0 0 1.5rem
    transition-duration: .25s
    transition-property: margin-left, margin-right, margin-top

    a
      color: darken($sp-primary, 15%)
      display: inline-block

      &:hover
        color: darken($sp-primary, 25%)

      &:active,
      &.is-active
        color: #000

      &.release-notes
        float: right

    .game-logo
      margin-bottom: 0

      &.is-spio
        background-size: cover
        background-image: url('~/assets/images/logo-starpeace-io.jpg')
        text-align: center

        a
          color: #FFF
          font-family: 'Varela Round', sans-serif
          font-size: 2.5rem
          letter-spacing: .5rem
          line-height: 4rem
          padding: .25rem .5rem
          text-shadow: 0 0 2rem rgba(0, 0, 0, .7)
          transition-duration: .25s
          transition-property: font-size

          &:first-child
            text-align: right

          &:last-child
            text-align: left

          &.logo-item
            margin: 0
            max-width: 2.6rem
            padding: 0 0 .1rem
            transition-property: margin-right

            +mobile
              padding-bottom: .2rem


        img
          background-size: 2.325rem
          display: block
          height: 2.325rem
          margin: 0
          max-width: 2.325rem
          width: 2.325rem
          transition-duration: .25s
          transition-property: background-size, height, max-width, width

      &.is-spo
        background-image: url('~/assets/images/logo-starpeace-online.jpg')
        background-repeat: no-repeat
        background-size: 100%

        a
          min-height: 5.25rem
          transition-duration: .25s
          transition-property: min-height
          width: 100%

          +mobile
            min-height: 4.8rem

    .game-notes
      font-size: 1rem

      a
        padding: .5rem 1rem .75rem


    &:hover
      background-color: $sp-primary-extra-light
      border-radius: 3px
      box-shadow: 0 8px 8px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1)
      margin-left: -.5rem
      margin-right: -.5rem

      .is-spio
        -webkit-animation: VerticalBackgroundScroll 10s linear infinite
        -moz-animation: VerticalBackgroundScroll 10s linear infinite
        animation: VerticalBackgroundScroll 10s linear infinite

        a
          font-size: 2.75rem

          &.logo-item
            margin-right: .15rem

        img
          background-size: 2.45rem
          height: 2.45rem
          max-width: 2.45rem
          width: 2.45rem

      .is-spo
        a
          min-height: 5.5rem

    &:active,
    &.is-active
      background-color: $sp-primary-light

    &.is-first
      margin-bottom: .5rem

  .menu
    background-color: #fff
    font-size: 1.3rem
    padding: 1rem
    padding-top: 1rem

    .menu-label
      border-bottom: 1px solid opacify(lighten($sp-primary-bg, 5%), .8)
      padding-bottom: .75rem
      margin-bottom: .5rem

      &:not(:first-child)
        margin-top: 1.5rem

    li
      &:not(:first-child)
        margin-top: .25rem

      a
        &:hover
          background-color: lighten($sp-primary-bg, 50%)

        &:active,
        &.is-active
          background-color: lighten($sp-primary-bg, 35%)
          color: #fff

</style>
