const fs = require('fs')
const webpack = require('webpack')

const is_development = process.env.NODE_ENV === 'development'

module.exports = {
  css: [
    { src: '~/assets/stylesheets/starpeace-bulma.sass', lang: 'sass' }
  ],
  head: {
    title: 'STARPEACE Project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Player and Developer Community for STARPEACE: the real-time city-building economic simulation and cooperative multiplayer game' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans|Varela+Round' }
    ]
  },
  render: {
    resourceHints: false
  },
  generate: {
    fallback: false
  },
  build: {
    // analyze: true,
    publicPath: '/assets/',
    vendor: [],
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.coffee$/,
        use: 'coffee-loader',
        exclude: /(node_modules)/
      });
      config.module.rules.push({
        test: /\.haml$/,
        use: 'haml',
        exclude: /(node_modules)/
      });
    }
  },
  modules: [
    '@nuxtjs/moment', ['@nuxtjs/google-analytics', { id: 'UA-123879676-1', debug: { sendHitTask: !is_development } }]
  ],
  plugins: [
    { src: '~/plugins/font-awesome', ssr: false }
  ]
}
