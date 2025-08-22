/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import * as db from '../db/logs'
import checkJWT from '../middleware/auth.config'
import mediaUpload from '../middleware/multer.config'

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


// POST /api/create-log
router.post('/create-log', checkJWT, mediaUpload.any(), async (req, res) => {
  
  // const files = req.files as Express.Multer.File[]
  console.log(req.files)


  try {
      // Step 1: Parse any JSON fields sent via multipart/form-data
      const data = JSON.parse(req.body.data)
      const mediaMetadata = data.media ?? []

      // Step 2: Convert uploaded files into the format your DB expects
      const uploadedMedia = (req.files as Express.Multer.File[]).map((file) => {
        const meta = mediaMetadata.find((m: any) => m.id === file.fieldname)
        return {
          url: file.path,
          type: file.mimetype.startsWith('image') ? 'image' : 'video',
          caption: meta?.caption ?? null,
        }
      })

      console.log(uploadedMedia)

      const logId = await db.addFullLog({
        ...data,
        media: uploadedMedia,
      })  

      res.status(201).json({ id: logId })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server failed to create new log' })
    }
  }
)


// GET /api/update-log/:logId
router.patch('/update-log/:logId', checkJWT, mediaUpload.array('media'), async (req, res) => {
  const logId = Number(req.params.logId)
  const files = req.files as Express.Multer.File[]
  console.log(req.files); // multer should populate this

  const { core } = JSON.parse(req.body.data)
  core.user_id = req.user?.id // override anything the client tried to send

  try {
      // Step 1: Parse any JSON fields sent via multipart/form-data
      const data = JSON.parse(req.body.data) // assuming client sent JSON as string in a `data` field
      const mediaAdded = data.media.added

      // Step 2: Convert uploaded files into the format your DB expects
      const uploadedMedia = files.map((file, i) => ({
        url: file.path,
        type: file.mimetype.startsWith('image') ? 'image' : 'video',
        caption: mediaAdded[i]?.caption ?? null,
      }))

      // Step 3: Combine with any retained media (if editing)
      const mediaPayload = {
        retained: data.media?.retained ?? [], // e.g. [{ mediaId: 3 }]
        added: uploadedMedia,
      }

      

      await db.updateFullLog(logId, {
        ...data,
        media: mediaPayload,
      })

      res.sendStatus(200)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server failed to update log' })
    }
  }
)

export default router
