const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')

const read_all_files_sync = function(dir, file_matcher) {
  return fs.readdirSync(dir).reduce(function(files, file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      return files.concat(read_all_files_sync(path.join(dir, file), file_matcher));
    }
    else {
      return files.concat(file_matcher(file) ? [path.join(dir, file)] : []);
    }
  }, []);
}

const parse_to_json = function(root_dir, whitelist_patterns, blacklist_patterns) {
  let file_matcher = function(file_path) {
    for (let pattern of blacklist_patterns) {
      if (file_path.endsWith(pattern)) return false;
    }
    for (let pattern of whitelist_patterns) {
      if (!file_path.endsWith(pattern)) return false;
    }
    return true;
  };

  return _.flatten(_.map(read_all_files_sync(root_dir, file_matcher), function(path) { return JSON.parse(fs.readFileSync(path)); }));
}

const is_development = process.env.NODE_ENV === 'development'

const building_definitions = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/buildings'), ['.json'], ['-image.json', '-simulation.json']);
const building_simulation_definitions = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/buildings'), ['-simulation.json'], []);
const company_seals = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/seals'), ['.json'], []);
const industry_categories = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/industry'), ['industry-categories.json'], []);
const industry_types = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/industry'), ['industry-types.json'], []);
const inventions = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/inventions'), ['.json'], []);
const levels = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/industry'), ['levels.json'], []);
const resource_types = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/industry'), ['resource-types.json'], []);
const resource_units = parse_to_json(path.resolve('node_modules/@starpeace/starpeace-assets/assets/industry'), ['resource-units.json'], []);

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
  env: {
    BUILDING_DEFINITIONS: building_definitions,
    BUILDING_SIMULATION_DEFINITIONS: building_simulation_definitions,
    COMPANY_SEALS: company_seals,
    INDUSTRY_CATEGORIES: industry_categories,
    INDUSTRY_TYPES: industry_types,
    INVENTIONS: inventions,
    LEVELS: levels,
    RESOURCE_TYPES: resource_types,
    RESOURCE_UNITS: resource_units
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
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.coffee$/,
        use: 'coffee-loader',
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
