<template lang='haml'>
  .column.column-menu.is-one-quarter-tablet.is-one-quarter-desktop.is-one-fifth-widescreen.is-one-fifth-fullhd
    %aside.menu
      %ul.menu-list
        %p.menu-label
          Game Clients

      .client-link.first-client-link
        .level.game-title.wide
          %a.level-item{href:'https://client.starpeace.io'} STARPEACE.io
        .level.game-notes
          %a.level-left{href:'https://client.starpeace.io'} {{ client_version }}
          %a.level-right.release-notes{href:'https://client.starpeace.io/release'}
            %span.is-hidden-tablet-only
              Release&nbsp;
            Notes
      .client-link
        .level.game-title
          %a.level-item{href:'http://www.starpeaceonline.com/'} StarPeace Online
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
          %a{':class':"category == 'contribute.support' ? 'is-active' : ''", href:"/contribute/support"} Support Project
        %li
          %a{':class':"category == 'contribute.ledger' ? 'is-active' : ''", href:"/contribute/ledger"} Project Ledger

        %p.menu-label
          FAQs
        %li
          %a{':class':"category == 'faq.about' ? 'is-active' : ''", href:"/faq/about"} Project
        %li
          %a{':class':"category == 'faq.clients' ? 'is-active' : ''", href:"/faq/clients"} Game Clients
        %li
          %a{':class':"category == 'faq.contribute' ? 'is-active' : ''", href:"/faq/contribute"} Contribute

</template>

<script lang='coffee'>
export default
  props:
    category: String

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
    border: 1px solid lighten($sp-primary-bg, 15%)
    margin: 0 0 1.5rem

    &.first-client-link
      margin-bottom: .5rem

    &:hover
      background-color: $sp-primary-extra-light

    &:active,
    &.is-active
      background-color: $sp-primary-light

    a
      color: darken($sp-primary, 15%)
      display: inline-block
      margin-top: .25rem

      &:hover
        color: darken($sp-primary, 25%)

      &:active,
      &.is-active
        color: #000

      &.release-notes
        float: right

    .game-title
      font-size: 1.75rem
      margin-bottom: 0

      &.wide
        font-family: 'Varela Round', sans-serif
        letter-spacing: .2rem

      a
        padding: .25rem 1rem .25rem

    .game-notes
      font-size: 1rem

      a
        padding: .25rem 1rem .75rem

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
