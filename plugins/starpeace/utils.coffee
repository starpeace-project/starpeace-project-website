import _ from 'lodash'

export default class Utils
  @format_money: (value, decimals=0) -> (value || 0).toFixed(decimals).replace(new RegExp("\\d(?=(\\d{3})+#{if decimals > 0 then '\.' else ''}$)", 'g'), '$&,')
