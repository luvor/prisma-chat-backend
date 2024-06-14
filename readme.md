# prisma chat backend

Develop a real-time chat application using <b>Node.js, WebSocket, and Vue.js</b>. Users will be able to send and receive messages in real-time, share files (displayed as downloadable links), and see past messages upon connection.

## Key Features:
- Real-Time Messaging: Users send and receive messages instantly.
- File Sharing: Users upload files of any type, displayed as links in the chat.
- Message Persistence: Store and retrieve messages from SQLite using Prisma.
- Drag-and-Drop: Integrate FilePond for seamless file uploads.


## Getting Started

1. Install & run backend
```bash
git clone https://github.com/luvor/prisma-chat-backend
npm install
npx prisma migrate dev --name init
node index.js
```
2. Install & run frontend
```bash
git clone https://github.com/luvor/prisma-chat-client
npm install
npm run dev
```

<br>

<center><img src="https://github.com/luvor/prisma-chat-client/assets/86249418/62db6873-27ba-4d90-b216-e82e914e0b10" /></center>

<br>
