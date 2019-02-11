<template lang='pug'>
.column.column-main-body(v-cloak=true)
  .card
    .card-content
      h2.is-size-2 Building Financials

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

      resource-type(:resource_types_by_id='resource_types_by_id', :resource_units_by_id='resource_units_by_id', :resource_price_adjustment_by_id='resource_price_adjustment_by_id')

      template(v-if='building_simulation_definitions_by_type.INDUSTRY && building_simulation_definitions_by_type.INDUSTRY.length')
        financial-industry(
          :building_definitions_by_id='building_definitions_by_id',
          :company_seals_by_id='company_seals_by_id',
          :resource_types_by_id='resource_types_by_id',
          :resource_units_by_id='resource_units_by_id',
          :selected_industry_categories_by_id='selected_industry_categories_by_id',
          :selected_industry_types_by_id='selected_industry_types_by_id',
          :selected_company_seals_by_id='selected_company_seals_by_id',
          :resource_price_adjustment_by_id='resource_price_adjustment_by_id',
          :building_simulation_definitions='building_simulation_definitions_by_type.INDUSTRY')

</template>

<script lang='coffee'>
import _ from 'lodash'
import {
  BuildingDefinition
  BuildingSimulationDefinition
  CompanySeal
  IndustryCategory
  IndustryType
  ResourceType
  ResourceUnit
} from '@starpeace/starpeace-assets'

import FinancialsIndustryComponent from '~/components/reference/building/financials-industry.vue'
import ResourceTypeComponent from '~/components/reference/building/resource-type.vue'

export default
  category: 'reference.building.financials'

  components:
    'financial-industry': FinancialsIndustryComponent
    'resource-type': ResourceTypeComponent

  data: ->
    selected_industry_categories_by_id: _.fromPairs(_.map(@industry_categories(), (category) -> [category.id, true]))
    selected_industry_types_by_id: _.fromPairs(_.map(@industry_types(), (type) -> [type.id, true]))
    selected_company_seals_by_id: _.fromPairs(_.map(@company_seals(), (seal) -> [seal.id, true]))

    resource_price_adjustment_by_id: _.fromPairs(_.map(@resource_types(), (type) -> [type.id, 200]))

  computed:
    building_definitions_by_id: -> _.keyBy(@building_definitions(), 'id')
    company_seals_by_id: -> _.keyBy(@company_seals(), 'id')
    resource_types_by_id: -> _.keyBy(@resource_types(), 'id')
    resource_units_by_id: -> _.keyBy(@resource_units(), 'id')

    sorted_industry_categories: -> _.sortBy(@industry_categories(), (category) -> category.label.EN)
    sorted_industry_types: -> _.sortBy(@industry_types(), (type) -> type.label.EN)
    sorted_company_seals: -> _.sortBy(@company_seals(), (seal) -> seal.name_short.EN)

    building_simulation_definitions_by_type: -> _.groupBy(@building_simulation_definitions(), 'type')

  methods:
    building_definitions: () -> _.map(process.env.BUILDING_DEFINITIONS, BuildingDefinition.from_json)
    building_simulation_definitions: () -> _.map(process.env.BUILDING_SIMULATION_DEFINITIONS, BuildingSimulationDefinition.from_json)
    company_seals: () -> _.map(process.env.COMPANY_SEALS, CompanySeal.from_json)
    industry_categories: () -> _.map(process.env.INDUSTRY_CATEGORIES, IndustryCategory.from_json)
    industry_types: () -> _.map(process.env.INDUSTRY_TYPES, IndustryType.from_json)
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

</script>

<style lang='sass' scoped>
@import '~assets/stylesheets/starpeace-variables'

.filters-container
  margin: 1rem 0

  .navbar-item
    &.is-active
      background-color: $sp-primary !important
      color: #FFF

      &:hover
        background-color: darken($sp-primary, 5%) !important

</style>
