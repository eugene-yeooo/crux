import express from 'express'
import * as db from '../db/users.ts'

const router = express.Router()

// GET /api/v1/users/:username
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const user = await db.getUserByUsername(username)
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' })
  }
})

// GET /api/v1/users/:authId
router.get('/:authId', async (req, res) => {
  try {
    const authId = decodeURIComponent(req.params.authId)
    console.log('authId param:', authId)
    const user = await db.getUserByAuthId(authId)
    if (!user) return res.status(404).json({ message: 'User not found' })
       
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' })
  }
})

export default router
