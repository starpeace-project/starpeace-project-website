<template lang='pug'>
.column.column-main-body(v-cloak=true)
  .card
    header.card-header
      p.card-header-title.is-size-4 Building Financials

    .filters-container
      nav.navbar
        .navbar-menu
          .navbar-start
            .navbar-item.has-dropdown.is-hoverable
              a.navbar-link Category
              .navbar-dropdown
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_category('all')") All
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_category('none')") None
                hr.navbar-divider
                a.navbar-item(
                  v-for='category in sorted_industry_categories',
                  v-on:click.stop.prevent="toggle_filter_category(category.id)",
                  :class="selected_industry_categories_by_id[category.id] ? 'is-active' : ''"
                ) {{category.label.EN}}

            .navbar-item.has-dropdown.is-hoverable
              a.navbar-link Industry
              .navbar-dropdown
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_industry_type('all')") All
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_industry_type('none')") None
                hr.navbar-divider
                a.navbar-item(
                  v-for='industry_type in sorted_industry_types',
                  v-on:click.stop.prevent="toggle_filter_industry_type(industry_type.id)",
                  :class="selected_industry_types_by_id[industry_type.id] ? 'is-active' : ''"
                ) {{industry_type.label.EN}}

            .navbar-item.has-dropdown.is-hoverable
              a.navbar-link Seal
              .navbar-dropdown
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_seal('all')") All
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_seal('none')") None
                hr.navbar-divider
                a.navbar-item(
                  v-for='seal in sorted_company_seals',
                  v-on:click.stop.prevent="toggle_filter_seal(seal.id)",
                  :class="selected_company_seals_by_id[seal.id] ? 'is-active' : ''"
                ) {{seal.name_short.EN}}

            .navbar-item.has-dropdown.is-hoverable
              a.navbar-link Level
              .navbar-dropdown
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_level('all')") All
                a.navbar-item(v-on:click.stop.prevent="toggle_filter_level('none')") None
                hr.navbar-divider
                a.navbar-item(
                  v-for='level in sorted_levels',
                  v-on:click.stop.prevent="toggle_filter_level(level.id)",
                  :class="selected_levels_by_id[level.id] ? 'is-active' : ''"
                ) {{level.label.EN}}

    .card-content.main-card
      resource-type(
        :resource_types_by_id='resource_types_by_id',
        :resource_units_by_id='resource_units_by_id',
        :resource_price_cost_adjustment_by_id='resource_price_cost_adjustment_by_id',
        :resource_price_sale_adjustment_by_id='resource_price_sale_adjustment_by_id'
      )

      financial-industry(
        :building_definitions_by_id='building_definitions_by_id',
        :company_seals_by_id='company_seals_by_id',
        :levels_by_id='levels_by_id',
        :inventions_by_id='inventions_by_id',
        :industry_categories_by_id='industry_categories_by_id',
        :industry_types_by_id='industry_types_by_id',
        :resource_types_by_id='resource_types_by_id',
        :resource_units_by_id='resource_units_by_id',
        :selected_industry_categories_by_id='selected_industry_categories_by_id',
        :selected_industry_types_by_id='selected_industry_types_by_id',
        :selected_company_seals_by_id='selected_company_seals_by_id',
        :selected_levels_by_id='selected_levels_by_id',
        :max_levels_by_id='max_levels_by_id',
        :resource_price_cost_adjustment_by_id='resource_price_cost_adjustment_by_id',
        :resource_price_sale_adjustment_by_id='resource_price_sale_adjustment_by_id',
        :demand_by_id_type='demand_by_id_type',
        :building_simulation_definitions='building_simulation_definitions()'
      )

</template>

<script lang='coffee'>
import _ from 'lodash'
import {
  BuildingDefinition
  BuildingSimulationDefinitionParser
  CompanySeal
  IndustryCategory
  IndustryType
  InventionDefinition
  Level
  ResourceType
  ResourceUnit
} from '@starpeace/starpeace-assets'

import FinancialsIndustryComponent from '~/components/reference/building/financials-industry.vue'
import ResourceTypeComponent from '~/components/reference/building/resource-type.vue'

demand_for_resource = (resource_type) ->
  return 10 if resource_type == 'AUTOMOBILE'
  return 5 if resource_type == 'FUNERAL_SERVICE'
  100

export default
  category: 'reference.building.financials'

  components:
    'financial-industry': FinancialsIndustryComponent
    'resource-type': ResourceTypeComponent

  data: ->
    selected_industry_categories_by_id: _.fromPairs(_.map(@industry_categories(), (category) -> [category.id, true]))
    selected_industry_types_by_id: _.fromPairs(_.map(@industry_types(), (type) -> [type.id, true]))
    selected_company_seals_by_id: _.fromPairs(_.map(@company_seals(), (seal) -> [seal.id, true]))
    selected_levels_by_id: _.fromPairs(_.map(@levels(), (level) -> [level.id, true]))

    max_levels_by_id: _.fromPairs(_.map(@building_simulation_definitions(), (definition) -> [definition.id, definition.max_level || 1]))
    demand_by_id_type:  _.fromPairs(_.compact(_.flatMap(@building_simulation_definitions(), (definition) ->
      return null unless definition.type == 'STORE'
      _.flatMap(definition.products, (product) ->
        _.map(product.outputs, (output) -> ["#{definition.id}-#{output.resource}", demand_for_resource(output.resource)])
      )
    )))
    resource_price_cost_adjustment_by_id: _.fromPairs(_.map(@resource_types(), (type) -> [type.id, (if type.id == 'EXECUTIVE' || type.id == 'PROFESSIONAL' || type.id == 'WORKER' then 100 else 200)]))
    resource_price_sale_adjustment_by_id: _.fromPairs(_.map(@resource_types(), (type) -> [type.id, (if type.id == 'EXECUTIVE' || type.id == 'PROFESSIONAL' || type.id == 'WORKER' then 200 else 400)]))

  computed:
    building_definitions_by_id: -> _.keyBy(@building_definitions(), 'id')
    company_seals_by_id: -> _.keyBy(@company_seals(), 'id')
    levels_by_id: -> _.keyBy(@levels(), 'id')
    inventions_by_id: -> _.keyBy(@inventions(), 'id')
    industry_categories_by_id: -> _.keyBy(@industry_categories(), 'id')
    industry_types_by_id: -> _.keyBy(@industry_types(), 'id')
    resource_types_by_id: -> _.keyBy(@resource_types(), 'id')
    resource_units_by_id: -> _.keyBy(@resource_units(), 'id')

    sorted_industry_categories: -> _.sortBy(@industry_categories(), (category) -> category.label.EN)
    sorted_industry_types: -> _.sortBy(@industry_types(), (type) -> type.label.EN)
    sorted_company_seals: -> _.sortBy(@company_seals(), (seal) -> seal.name_short.EN)
    sorted_levels: -> _.sortBy(@levels(), (seal) -> seal.level)

  methods:
    building_definitions: () -> _.map(process.env.BUILDING_DEFINITIONS, BuildingDefinition.from_json)
    building_simulation_definitions: () -> _.map(process.env.BUILDING_SIMULATION_DEFINITIONS, BuildingSimulationDefinitionParser.from_json)
    company_seals: () -> _.map(process.env.COMPANY_SEALS, CompanySeal.from_json)
    industry_categories: () -> _.map(process.env.INDUSTRY_CATEGORIES, IndustryCategory.from_json)
    industry_types: () -> _.map(process.env.INDUSTRY_TYPES, IndustryType.from_json)
    inventions: () -> _.map(process.env.INVENTIONS, InventionDefinition.from_json)
    levels: () -> _.map(process.env.LEVELS, Level.from_json)
    resource_types: () -> _.map(process.env.RESOURCE_TYPES, ResourceType.from_json)
    resource_units: () -> _.map(process.env.RESOURCE_UNITS, ResourceUnit.from_json)

    toggle_filter_category: (category_id) ->
      if category_id == 'all' || category_id == 'none'
        @selected_industry_categories_by_id[key] = category_id == 'all' for key,value of @selected_industry_categories_by_id
      else
        @selected_industry_categories_by_id[category_id] = !@selected_industry_categories_by_id[category_id]
    toggle_filter_industry_type: (industry_type) ->
      if industry_type == 'all' || industry_type == 'none'
        @selected_industry_types_by_id[key] = industry_type == 'all' for key,value of @selected_industry_types_by_id
      else
        @selected_industry_types_by_id[industry_type] = !@selected_industry_types_by_id[industry_type]
    toggle_filter_seal: (seal_id) ->
      if seal_id == 'all' || seal_id == 'none'
        @selected_company_seals_by_id[key] = seal_id == 'all' for key,value of @selected_company_seals_by_id
      else
        @selected_company_seals_by_id[seal_id] = !@selected_company_seals_by_id[seal_id]
    toggle_filter_level: (level_id) ->
      if level_id == 'all' || level_id == 'none'
        @selected_levels_by_id[key] = level_id == 'all' for key,value of @selected_levels_by_id
      else
        @selected_levels_by_id[level_id] = !@selected_levels_by_id[level_id]


</script>

<style lang='sass' scoped>
@import '~assets/stylesheets/starpeace-variables'

.filters-container
  border-bottom: 1px solid #ddd
  margin-bottom: 1rem
  margin-top: 2px
  padding: 0 1rem

  .navbar-item
    &.is-active
      background-color: $sp-primary !important
      color: #FFF

      &:hover
        background-color: darken($sp-primary, 5%) !important

.main-card
  padding-top: 0

</style>
