<template lang='pug'>
.resource-type-section
  h4.is-size-4(v-on:click.stop.prevent="expanded = !expanded")
    font-awesome-icon.toggle-icon(:icon="['fas', 'angle-down']", v-show='expanded')
    font-awesome-icon.toggle-icon(:icon="['fas', 'angle-right']", v-show='!expanded')
    | Resources
  table.table.is-bordered.is-striped.is-hoverable.resources-table(v-show='expanded')
    thead
      tr
        th Name
        th Unit
        th.has-text-right Price
        th.has-text-centered(colspan=2) Adjustment (%)
        th.has-text-right Adjusted Price

    tbody
      tr(v-for='resource in sorted_resource_types')
        td {{name_for(resource)}}
        td {{resource.unit_id}}
        td.has-text-right {{format_money(resource.price, 2)}}
        td.price-scale-slider
          input.slider.is-fullwidth(type='range', step='1', min='1', max='500', v-model='resource_price_adjustment_by_id[resource.id]')
        td.price-scale-text
          input.is-fullwidth(type='number', step='1', min='1', max='500', v-model='resource_price_adjustment_by_id[resource.id]')
        td.has-text-right {{format_money((resource_price_adjustment_by_id[resource.id] / 100) * resource.price, 2)}}

</template>

<script lang='coffee'>
import _ from 'lodash'
import Vue from 'vue'

import Financials from '~/plugins/starpeace/reference/building/financials.coffee'
import Utils from '~/plugins/starpeace/utils.coffee'

export default
  props:
    resource_types_by_id: Object
    resource_units_by_id: Object
    resource_price_adjustment_by_id: Object

  data: ->
    expanded: false

  computed:
    building_simulation_definitions_by_id: -> _.keyBy(@building_simulation_definitions, 'id')
    financials: -> _.map(@building_simulation_definitions, (definition) => Financials.from_definition(@resource_types_by_id, @resource_units_by_id, definition))

    sorted_resource_types: -> _.sortBy(_.values(@resource_types_by_id), (resource) => @name_for(resource))

  methods:
    format_money: Utils.format_money

    name_for: (resource) -> resource?.label_plural?.EN || resource?.id || 'unknown'
</script>

<style lang='sass' scoped>
.resource-type-section
  margin-bottom: 1rem

  h4
    border-bottom: 1px solid #ccc
    cursor: pointer
    margin-bottom: .5rem

    .toggle-icon
      margin-right: .25rem
      width: 1.5rem

.resources-table
  thead
    th
      user-select: none

  .price-scale-slider
    input
      margin: 0

</style>
