import express from 'express'
import * as db from '../db/logs'

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

export default router
