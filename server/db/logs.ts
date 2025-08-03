/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex } from 'knex'
import connection from './connection'

export async function getLogsByUsername(username: string) {
  // Step 1: Fetch logs + user + grouped media URLs
  const baseLogs = await connection('logs')
    .join('users', 'logs.user_id', 'users.id')
    .leftJoin('media', 'logs.id', 'media.log_id') //
    .where('users.username', username)
    .select(
      'logs.*',
      'users.username',
      connection.raw(`COALESCE(json_group_array(json_object('url', media.url, 'type', media.type, 'caption', media.caption)), '[]') as media`)

    )
    .groupBy('logs.id')

  // Step 2: Collect log IDs by type (returns an array)
  const caveLogIds = baseLogs.filter(log => log.type === 'cave').map(log => log.id)
  const climbLogIds = baseLogs.filter(log => log.type === 'climb').map(log => log.id)
  // const canyonLogIds = baseLogs.filter(log => log.type === 'canyon').map(log => log.id)
  // const alpineLogIds = baseLogs.filter(log => log.type === 'alpine').map(log => log.id)
  // const diveLogIds = baseLogs.filter(log => log.type === 'dive').map(log => log.id)

  // Step 3: Fetch subtable records (returns the row matching the IDs)
  const caveLogs = await connection('log_caves').whereIn('log_id', caveLogIds)
  const caveMap = Object.fromEntries(caveLogs.map(log => [log.log_id, log])) //Object.fromEntries() is a built-in JavaScript method that converts an array of key-value pairs into an object.

  const climbLogs = await connection('log-climbs').whereIn('log_id', climbLogIds)
  const climbMap = Object.fromEntries(climbLogs.map(log => [log.log_id, log]))

  // const canyonLogs = await connection('log-canyons').whereIn('log_id', canyonLogIds)
  // const canyonMap = Object.fromEntries(canyonLogs.map(log => [log.log_id, log]))

  // const alpineLogs = await connection('log-alpine').whereIn('log_id', alpineLogIds)
  // const alpineMap = Object.fromEntries(alpineLogs.map(log => [log.log_id, log]))

  // const diveLogs = await connection('log-dives').whereIn('log_id', diveLogIds)
  // const diveMap = Object.fromEntries(diveLogs.map(log => [log.log_id, log]))

  // Step 4: Combine shared + specific log data (aka a 'merge')
  const fullLogs = baseLogs.map(log => ({
    ...log,
    media: JSON.parse(log.media),
    details:
      log.type === 'cave' ? caveMap[log.id] ?? null
      : log.type === 'climb' ? climbMap[log.id] ?? null
      // : log.type === 'canyon' ? canyonMap[log.id] ?? null
      // : log.type === 'alpine' ? alpineMap[log.id] ?? null
      // : log.type === 'dive' ? diveMap[log.id] ?? null
      : null,
  }))

  return fullLogs
}

export async function getLogById(username: string, logId: number) {
  const baseLog =  await connection('logs')
    .join('users', 'users.id', 'logs.user_id')
    .leftJoin('media', 'logs.id', 'media.log_id')
    .where('users.username', username)
    .andWhere('logs.id', logId)
    .select('logs.*', 'users.username', 'users.avatar_url', 'users.auth0_id', connection.raw(`COALESCE(json_group_array(json_object('mediaId', media.id, 'url', media.url, 'type', media.type, 'caption', media.caption)), '[]') as media`))
    .groupBy('logs.id')
    .first()

  let details // subtable details

  switch (baseLog.type) {
    case 'cave':
      details = await connection('log_caves').where('log_id', logId).first()
      break
    case 'climb':
      details = await connection('log_climbs').where('log_id', logId).first()
      break
    case 'canyon':
      details = await connection('log_canyons').where('log_id', logId).first()
      break
    // add more log types here
    default:
      break
  }

  const fullLog = {...baseLog, media: JSON.parse(baseLog.media), details, }

  return fullLog
}


// ------------- DELETE ---------------- //

export async function deleteLogById(id: number) {
  return await connection('logs').where({ id }).del()
}


// -------------- CREATE ---------------- //

export async function addLogCore(coreData: any, trx: Knex.Transaction) {
  const [id] = await trx('logs').insert(coreData).returning('id')
  return typeof id === 'object' ? id.id : id
}


export async function addLogCave(logId: number, caveData: any, trx: Knex.Transaction) {
  return trx('log_caves').insert({
    log_id: logId,
    ...caveData,
  })
}

export async function addLogClimb(logId: number, climbData: any, trx: Knex.Transaction) {
  return trx('log_climbs').insert({
    log_id: logId,
    ...climbData,
  })
}

// add more log types here

export async function addMedia(
  logId: number,
  media: { url: string; type: string; caption: string | null }[],
  trx: Knex.Transaction
) {
  if (!media.length) return

  const formatted = media.map((m) => ({
    log_id: logId,
    url: m.url,
    type: m.type,
    caption: m.caption,
  }))

  await trx('media').insert(formatted)
}


export async function addFullLog(data: any) {
  const trx = await connection.transaction()

  try {
    const logId = await addLogCore(data.core, trx)

    const type = data.core.type

    switch (type) {
      case 'cave':
        if (data.cave) await addLogCave(logId, data.cave, trx)
        break
      case 'climb':
        // Add addLogClimb logic here later
        break
      // More types...
    }

    if (data.media?.length) {
      await addMedia(logId, data.media, trx)
    }

    await trx.commit()
    return logId
  } catch (err) {
    await trx.rollback()
    throw err
  }
}




// -------------- EDIT ----------------- //

export function updateLogCore(id: number, coreData: unknown, trx: Knex.Transaction) {
  return trx('logs').where({ id }).update(coreData)
}

export async function updateLogCave(logId: number, caveData: unknown, trx: Knex.Transaction) {
  return trx('log_caves').where({ log_id: logId }).update(caveData)
}

// add more log types here

export async function updateMedia(
  logId: number, 
  mediaUpdate: { 
    retained: { mediaId: number, caption: string }[], 
    added: { url: string, type: string, caption: string }[] 
  },
  trx: Knex.Transaction
) {
    
    // delete media that has not been retained:
    const existing = await trx('media').where('log_id', logId).select('id')

    const existingIds = existing.map((m) => m.id)

    const retainedIds = mediaUpdate.retained.map((m) => m.mediaId)

    const idsToDelete = existingIds.filter((id) => !retainedIds.includes(id))

    if (idsToDelete.length) {
      await trx('media').whereIn('id', idsToDelete).delete()
    }
    

    // update captions
      for (const m of mediaUpdate.retained) {
        await trx('media')
          .where({ id: m.mediaId })
          .update({ caption: m.caption })
      }
        
    // add new media
    if (mediaUpdate.added.length) {
      const newRows = mediaUpdate.added.map((m) => ({
        log_id: logId,
        url: m.url,
        type: m.type,
        caption: m.caption ?? null
      }))
      await trx('media').insert(newRows)
    }

    console.log('added:', mediaUpdate.added)
    console.log('deleted:', idsToDelete)
    
}


// combining function
export async function updateFullLog(logId: number, data: any) {
  const trx = await connection.transaction()

  try {
    await updateLogCore(logId, data.core, trx)

    const type = data.core.type 

    switch (type) {
      case 'cave' :
        if (data.cave) await updateLogCave(logId, data.cave, trx)
        break
      case 'climb' :
        if (data.climb)
        break
      //more types here
    }

    if (data.media) {
      await updateMedia(logId, data.media, trx)
    }

    await trx.commit()

  } catch (err) {
    await trx.rollback()
    throw err
  }
}