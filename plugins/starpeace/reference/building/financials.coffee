import _ from 'lodash'

export default class Financials
  constructor: () ->

    Object.defineProperty @, 'opex', get: -> @opex_labor + @opex_operations + @opex_supplies
    Object.defineProperty @, 'profit', get: -> @income - @opex
    Object.defineProperty @, 'profit_month', get: -> @profit * 30
    Object.defineProperty @, 'roi_month', get: -> if @profit_month < 0 then Number.MAX_VALUE else Math.ceil(@capex / @profit_month)

  @from_definition: (resource_types_by_id, resource_units_by_id, level_by_id, resource_price_cost_adjustment_by_id, resource_price_sale_adjustment_by_id, definition) ->
    cost_price_of = (resource_id) -> (resource_types_by_id[resource_id]?.price || 0) * ((resource_price_cost_adjustment_by_id[resource_id] || 100) / 100)
    sale_price_of = (resource_id) -> (resource_types_by_id[resource_id]?.price || 0) * ((resource_price_sale_adjustment_by_id[resource_id] || 100) / 100)

    full_level_adjustment = level_by_id[definition.id] || 1
    half_level_adjustment = 1 + ((level_by_id[definition.id] || 1) - 1) * .5

    financials = new Financials()
    financials.id = definition.id

    financials.capex = _.reduce(definition.construction_inputs, ((result, value) -> result + value.quantity * cost_price_of(value.resource) * half_level_adjustment), 0)

    if definition.type == 'FACTORY'
      total_duration = 0
      opex_labor = 0
      opex_operations = 0
      opex_supplies = 0
      income = 0
      for stage in definition.stages
        total_duration += stage.duration
        opex_labor += _.reduce(stage.labor, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * full_level_adjustment), 0) * stage.duration
        opex_operations += _.reduce(stage.operations, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * half_level_adjustment), 0) * stage.duration
        opex_supplies += _.reduce(stage.inputs, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * full_level_adjustment), 0) * stage.duration
        income += _.reduce(stage.outputs, ((result, value) -> result + value.max_velocity * sale_price_of(value.resource) * full_level_adjustment), 0) * stage.duration
      financials.opex_labor = opex_labor / total_duration
      financials.opex_operations = opex_operations / total_duration
      financials.opex_supplies = opex_supplies / total_duration
      financials.income = income / total_duration

    else if definition.type == 'STORAGE'
      financials.opex_labor = _.reduce(definition.labor, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * full_level_adjustment), 0)
      financials.opex_operations = _.reduce(definition.operations, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * half_level_adjustment), 0)
      financials.opex_supplies = 0
      financials.income = 0

    else if definition.type == 'STORE'
      financials.opex_labor = _.reduce(definition.labor, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * full_level_adjustment), 0)
      financials.opex_operations = _.reduce(definition.operations, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * half_level_adjustment), 0)

      opex_supplies = 0
      income = 0
      for product in definition.products
        opex_supplies += _.reduce(product.inputs, ((result, value) -> result + value.max_velocity * cost_price_of(value.resource) * full_level_adjustment), 0)
        income += _.reduce(product.outputs, ((result, value) -> result + value.max_velocity * sale_price_of(value.resource) * full_level_adjustment), 0)
      financials.opex_supplies = opex_supplies
      financials.income = income

    financials
