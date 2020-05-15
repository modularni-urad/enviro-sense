import { whereFilter } from 'knex-filter-loopback'

export function findDevices (cond, knex) {
  try {
    const filter = JSON.parse(cond.filter)
    return knex('devices').where(whereFilter(filter))
  } catch {
    throw new Error('wrong filter')
  }
}

function create (appId, devId, knex) {
  return knex('devices').insert({
    app_id: appId,
    dev_id: devId,
    latitude: 1,
    longitude: 1,
    altitude: 1
  })
}

export async function getDevID (appId, devId, knex) {
  const res = await knex('devices').where({ app_id: appId, dev_id: devId })
  return res.length > 0
    ? res[0].id
    : create(appId, devId, knex).returning('id')
}
