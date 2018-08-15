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
      .box.announcements
        %p.title Announcements
        %article.media{'v-for':'item in announcements'}
          .media-content
            .content
              .announcement-item-header
                %span.announcement-item-title {{item.title}}
                %span.announcement-item-info {{item.time}}
              .announcement-item-body{'v-html':'item.details'}
    .column.is-narrow.has-text-centered
      .box.has-background-primary
        %img{':src':'building_image_path()'}
    .column
      .box.recent-discussions
        %p.title
          %a{href:'https://starpeaceproject.com/discussions'} Recent Discussions
        %article.media{'v-for':'item in recent_discussions'}
          .media-content
            .content
              .forum-item-title
                %a{':href':'item.link'} {{item.title}}
              .forum-item-info {{item.pubDate}} by {{item.creator}}
              .forum-item-body{'v-html':'item.description'}
</template>

<script lang='coffee'>
# see https://developer.yahoo.com/yql/ for more details (xss workaround)
RSS_URL = "https://starpeaceproject.com/categories/open-discussion/feed.rss"
XSS_RSS_URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Fstarpeaceproject.com%2Fcategories%2Fopen-discussion%2Ffeed.rss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

recent_discussions = []
#if process.browser

export default
  category: 'homepage'

  mounted: ->
    window.handleResponse = (response) =>
      items = response?.query?.results?.item || []
      @recent_discussions = items

    script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', XSS_RSS_URL + "&callback=handleResponse")
    document.body.appendChild(script)

  data: ->
    recent_discussions: []
    announcements: [
      {
        title: 'New Project Homepage!'
        time: '2018-08-15'
        details: 'Welcome to the new community homepage for STARPEACE Project! Please mind the broken links and changing layout over the next several weeks as website iterates toward complete.<br/><br/>Browse the Community forum, join game and development Discord chatroom, or follow project on Twitter to stay informed of updates.'
      }
    ]

  methods:
    building_image_path: ->
      "/assets/img/building-#{Math.floor(Math.random() * 5) + 1}.gif"
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

.announcements
  .announcement-item-header
    border-bottom: 1px solid lighten($sp-primary, 25%)
    margin-bottom: .75rem
    padding-bottom: .5rem

  .announcement-item-title
    font-size: 1.4rem
    font-weight: bold
    margin-right: .5rem

  .announcement-item-info
    color: #555
    font-size: 1.2rem
    font-weight: 250

  .announcement-item-body
    font-size: 1.2rem

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
    color: #555
    font-weight: 250
    margin-top: .1rem

  .forum-item-body
    border-top: 1px solid rgba(219, 219, 219, .4)
    margin-top: .5rem
    padding-top: .5rem

</style>
