import express from 'express'
import * as db from '../db/logs'
import ensureUserExists from '../middleware/ensureUserExists'
import checkJWT from '../middleware/auth.config'
import knex from '../db/connection'

const router = express.Router()

// GET /api/v1/users/:username/logs
router.get('/users/:username/logs', async (req, res) => {
  try {
    const username = req.params.username
    const logs = await db.getLogsByUsername(username)
    res.json({ logs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching logs' })
  }
})

// GET /api/users/:username/log/:logId
router.get('/users/:username/log/:logId', async (req, res) => {
  try {
    const { username, logId } = req.params
    const log = await db.getLogById(username, Number(logId))
  
    res.json(log)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching log' })
  }
})

// GET /api/delete-log/:logId
router.delete('/delete-log/:logId', async (req, res) => {
  try {
    const id = Number(req.params.logId)
    await db.deleteLogById(id)
    res.status(200).json({ message: 'Log deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Error deleting log'})
  }
})

// GET /api/update-log/:logId
router.patch('/update-log/:logId', checkJWT, async (req, res) => {
  const logId = Number(req.params.logId)
  const { core, media, cave, climb, canyon, alpine, dive, hike, roadtrip, other } = req.body // add more types here
  const trx = await knex.transaction()

  try {
    await db.updateLogCore(logId, core, trx)
    
    const type = core.type

    if (type === 'cave' && cave) {
      await db.updateLogCave(logId, cave, trx)
    }
    // if (type === 'climb' && climb) {
    //   await db.updateLogClimb(logId, climb, trx)
    // }
    // add more types here

    if (media?.length) {
      // media function here 
    }

    await trx.commit()
    res.sendStatus(200)

  } catch (err) {
    await trx.rollback()
    console.error(err)
    return res.status(500).json({ message: 'Failed to update log' })
  }

})

export default router
