import _ from 'underscore'
import { whereFilter } from 'knex-filter-loopback'
import { getDevID } from './devices'

function _getFilter (filter) {
  try {
    return JSON.parse(filter)
  } catch (_) {
    throw new Error('wrong filter')
  }
}

export function find (cond, knex) {
  const filter = _getFilter(cond.filter)
  if (!_.isObject(filter) || _.isEmpty(filter)) {
    throw new Error('insufficient conditions')
  }
  let q = knex('envirodata')
  q = cond.fields ? q.select(cond.fields.split(',')) : q
  q = cond.limit ? q.limit(cond.limit) : q
  // mozna tohle? https://github.com/Terminal-Systems/knex-flex-filter
  return q.where(whereFilter(filter))
}

export async function create (body, knex) {
  const devid = await getDevID(body.app_id, body.dev_id, knex)
  const data = _.map(body.payload_fields, (v, k) => {
    return { typ: k, value: v, devid, time: body.time }
  })
  return knex('envirodata').insert(data)
}
