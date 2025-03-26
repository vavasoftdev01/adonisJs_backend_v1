import type { ApplicationService } from '@adonisjs/core/types'
import { Server } from 'socket.io'
import * as http from 'http'
import env from '#start/env'

export default class SocketProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * Create a new HTTP server for Socket.IO
   */
  async boot() {
    const httpServer = http.createServer()
    const io = new Server(httpServer)

    io.on('connection', (socket) => {
      console.log(`A user connected ${socket.id}`)
     
      socket.on('message', (msg) => { 
        console.log(`Hello from Ado server: ${msg}`) 
        io.emit("server-message", `Hello from Adonis 😉😉 ${msg}`);
      })
    })

    const socketPort = env.get('SOCKET_PORT') || 3334
    httpServer.listen(socketPort, () => {
      console.log(`Socket.IO server running on port ${socketPort}`)
    })

    
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    // Optionally, close the Socket.IO server here if needed
  }
}