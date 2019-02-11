import _ from 'lodash'

export default class Financials
  constructor: () ->

    Object.defineProperty @, 'opex', get: -> Math.ceil(@opex_required + @opex_optional)
    Object.defineProperty @, 'profit', get: -> Math.ceil(@income - @opex)
    Object.defineProperty @, 'profit_month', get: -> Math.ceil(@profit * 30)
    Object.defineProperty @, 'roi_hour', get: -> if @profit < 0 then Number.MAX_VALUE else Math.ceil(@capex / @profit)
    Object.defineProperty @, 'roi_day', get: -> if @profit < 0 then Number.MAX_VALUE else Math.ceil(@roi_hour / 24)
    Object.defineProperty @, 'roi_month', get: -> if @profit < 0 then Number.MAX_VALUE else Math.ceil(@roi_day / 30)

  @from_definition: (resource_types_by_id, resource_units_by_id, resource_price_adjustment_by_id, definition) ->
    price_of = (resource_id) -> (resource_types_by_id[resource_id]?.price || 0) * ((resource_price_adjustment_by_id[resource_id] || 100) / 100)

    financials = new Financials()
    financials.id = definition.id

    financials.capex = definition.cost
    financials.opex_required = Math.ceil(_.reduce(definition.required_inputs, ((result, value) -> result + value.max * price_of(value.resource)), 0))
    financials.opex_optional = Math.ceil(_.reduce(definition.optional_inputs, ((result, value) -> result + value.max * price_of(value.resource)), 0))
    financials.income = Math.ceil(_.reduce(definition.outputs, ((result, value) -> result + value.max * price_of(value.resource)), 0))

    financials
