<template lang='pug'>
.industry-section
  h4.is-size-4(v-on:click.stop.prevent="expanded = !expanded")
    font-awesome-icon.toggle-icon(:icon="['fas', 'angle-down']", v-show='expanded')
    font-awesome-icon.toggle-icon(:icon="['fas', 'angle-right']", v-show='!expanded')
    | Industry
  table.table.is-fullwidth.is-bordered.is-striped.is-hoverable.financials-table(v-show='expanded')
    thead
      tr.labels-row
        th(colspan=4)
        th.has-text-right CapEx / Upfront
        th.has-text-right(colspan=7) OpEx / Hourly
        th.has-text-right(colspan=4) Hourly
        th.has-text-right(colspan=2) Monthly
      tr.labels-row
        th.sortable(v-for='header,index in columns()', v-on:click.prevent='toggle_sort_column(index)', :class="header.align == 'right' ? 'has-text-right' : ''", :colspan="header.span ? header.span : 1")
          .sort-icon(v-show='sorted_index == index')
            font-awesome-icon(:icon="['fas', 'angle-down']", v-show='sorted_direction == -1')
            font-awesome-icon(:icon="['fas', 'angle-up']", v-show='sorted_direction == 1')
          | {{header.label}}

    tbody
      template(v-for='financial in sorted_simulation_financials')
        tr.buiding-row(v-on:click.prevent='toggle_row(financial.id)', :class="selected_by_id[financial.id] ? 'is-selected' : ''")
          td {{building_definitions_by_id[financial.id].category}}
          td {{building_definitions_by_id[financial.id].industry_type}}
          td {{company_seals_by_id[building_definitions_by_id[financial.id].seal_id].name_short.EN}}
          td {{building_definitions_by_id[financial.id].name.EN}}
          td.has-text-right {{format_money(financial.capex)}}
          td.has-text-right(colspan=3) {{format_money(financial.opex_optional)}}
          td.has-text-right(colspan=3) {{format_money(financial.opex_required)}}
          td.has-text-right {{format_money(financial.opex)}}
          td.has-text-right(colspan=3) {{format_money(financial.income)}}
          td.has-text-right {{format_money(financial.profit)}}
          td.has-text-right {{format_money(financial.profit_month)}}
          td.has-text-right {{financial.profit < 0 ? 'never' : financial.roi_month}}

        template(v-if="selected_by_id[financial.id] ? true : false")
          tr(v-for="resource_quantity in building_simulation_definitions_by_id[financial.id].optional_inputs")
            td(colspan=3)
            td.has-text-right {{resource_quantity.resource}}
            td
            td.has-text-right {{resource_quantity.max}}
            td.has-text-right {{format_money(price_of(resource_quantity), 2)}}
            td.has-text-right {{format_money(total_of(resource_quantity))}}
            td(colspan=3)
            td
            td(colspan=3)
            td
            td(colspan=2)

          tr(v-for="resource_quantity in building_simulation_definitions_by_id[financial.id].required_inputs")
            td(colspan=3)
            td.has-text-right {{resource_quantity.resource}}
            td
            td(colspan=3)
            td.has-text-right {{resource_quantity.max}}
            td.has-text-right {{format_money(price_of(resource_quantity), 2)}}
            td.has-text-right {{format_money(total_of(resource_quantity))}}
            td
            td(colspan=3)
            td
            td(colspan=2)

          tr(v-for="resource_quantity in building_simulation_definitions_by_id[financial.id].outputs")
            td(colspan=3)
            td.has-text-right {{resource_quantity.resource}}
            td
            td(colspan=3)
            td(colspan=3)
            td
            td.has-text-right {{resource_quantity.max}}
            td.has-text-right {{format_money(price_of(resource_quantity), 2)}}
            td.has-text-right {{format_money(total_of(resource_quantity))}}
            td
            td
            td

</template>

<script lang='coffee'>
import _ from 'lodash'
import Vue from 'vue'

import Financials from '~/plugins/starpeace/reference/building/financials.coffee'
import Utils from '~/plugins/starpeace/utils.coffee'

COLUMNS = [
  {field:'category', label:'Category'},
  {field:'industry_type', label:'Industry'},
  {field:'seal', label:'Seal'},
  {field:'name', label:'Name'},
  {field:'capex', label:'Total ($)', align:'right'},
  {field:'opex_optional', label:'Optional ($)', align:'right', span:3},
  {field:'opex_required', label:'Required ($)', align:'right', span:3},
  {field:'opex', label:'Total ($)', align:'right'},
  {field:'income', label:'Income ($)', align:'right', span:3},
  {field:'profit', label:'Profit ($)', align:'right'},
  {field:'profit_month', label:'Profit ($)', align:'right'},
  {field:'roi_month', label:'ROI', align:'right'}
]

export default
  props:
    building_definitions_by_id: Object
    company_seals_by_id: Object
    resource_types_by_id: Object
    resource_units_by_id: Object
    resource_price_adjustment_by_id: Object

    selected_industry_categories_by_id: Object
    selected_industry_types_by_id: Object
    selected_company_seals_by_id: Object

    building_simulation_definitions: Array

  data: ->
    expanded: true

    sorted_index: 11
    sorted_direction: -1
    selected_by_id: {}

  computed:
    building_simulation_definitions_by_id: -> _.keyBy(@building_simulation_definitions, 'id')
    financials: -> _.map(@building_simulation_definitions, (definition) => Financials.from_definition(@resource_types_by_id, @resource_units_by_id, @resource_price_adjustment_by_id, definition))

    filtered_financials: ->
      _.filter(@financials, (financial) =>
        return false unless @selected_industry_categories_by_id[@building_definitions_by_id[financial.id].category]
        return false unless @selected_industry_types_by_id[@building_definitions_by_id[financial.id].industry_type]
        return false unless @selected_company_seals_by_id[@building_definitions_by_id[financial.id].seal_id]
        true
      )
    sorted_simulation_financials: ->
      sort_by = []
      if COLUMNS[@sorted_index].field == 'category'
        sort_by.push((financial) => @building_definitions_by_id[financial.id].category)
      else if COLUMNS[@sorted_index].field == 'industry_type'
        sort_by.push((financial) => @building_definitions_by_id[financial.id].industry_type)
      else if COLUMNS[@sorted_index].field == 'seal'
        sort_by.push((financial) => @company_seals_by_id[@building_definitions_by_id[financial.id]?.seal_id].name_short?.EN || 'unknown')
      else if COLUMNS[@sorted_index].field == 'name'
        sort_by.push((financial) => @building_definitions_by_id[financial.id].name.EN)
      else
        sort_by.push(COLUMNS[@sorted_index].field)
      sort_by.push((financial) -> -financial.profit_month) if COLUMNS[@sorted_index].field == 'roi_month'

      sorted_financials = _.sortBy(@filtered_financials, sort_by)
      if @sorted_direction < 0 then _.reverse(sorted_financials) else sorted_financials

  methods:
    columns: () -> COLUMNS
    format_money: Utils.format_money

    price_of: (resource_quantity) -> (@resource_types_by_id[resource_quantity.resource]?.price || 0) * ((@resource_price_adjustment_by_id[resource_quantity.resource] || 100) / 100)
    total_of: (resource_quantity) -> resource_quantity.max * @price_of(resource_quantity)

    toggle_sort_column: (column_index) ->
      if @sorted_index == column_index
        @sorted_direction = @sorted_direction * -1
      else
        @sorted_index = column_index
    toggle_row: (definition_id) -> Vue.set(@selected_by_id, definition_id, !@selected_by_id[definition_id])

</script>

<style lang='sass' scoped>
.industry-section
  h4
    border-bottom: 1px solid #ccc
    cursor: pointer
    margin-bottom: .5rem

    .toggle-icon
      margin-right: .25rem
      width: 1.5rem

.financials-table
  thead
    th
      user-select: none

      &.sortable
        cursor: pointer

        .sort-icon
          display: inline-block
          float: right

        &.has-text-right
          .sort-icon
            float: left

  tbody
    tr
      &.buiding-row
        &.is-selected
          cursor: zoom-out

        &:not(.is-selected)
          cursor: zoom-in

</style>
