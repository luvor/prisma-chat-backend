const express = require('express')
const { WebSocketServer } = require('ws')
const { PrismaClient } = require('@prisma/client')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const prisma = new PrismaClient()
const { v4: uuidv4 } = require('uuid') // For generating unique filenames

const app = express()
const server = require('http').createServer(app)
const wss = new WebSocketServer({ server })

// Configure multer to save files with original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4()
    const extension = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${extension}`)
  },
})

const upload = multer({ storage })

// Enable CORS for all routes
app.use(cors())

app.use(express.static('uploads'))

wss.on('connection', async (ws) => {
  // Fetch old messages from the database
  const oldMessages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
  })

  // Send old messages to the client
  ws.send(JSON.stringify({ type: 'oldMessages', data: oldMessages }))

  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message)
    const { user, content, fileUrl } = parsedMessage

    const newMessage = await prisma.message.create({
      data: { user, content, fileUrl },
    })

    const savedMessage = JSON.stringify(newMessage)

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(savedMessage)
      }
    })
  })
})

app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`
  res.json({ fileUrl })
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
