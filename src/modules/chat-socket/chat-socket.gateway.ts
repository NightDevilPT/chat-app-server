import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private users: Map<string, string> = new Map(); // Map to store userId -> socketId

  afterInit(server: Server) {
    console.log('WebSocket server initialized', server);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.users.set(userId, client.id);
      console.log(`Client connected: ${client.id} (User ID: ${userId})`);
    }
  }

  handleDisconnect(client: Socket) {
    // Find the user ID associated with the disconnected socket
    for (const [userId, socketId] of this.users.entries()) {
      if (socketId === client.id) {
        this.users.delete(userId);
        console.log(`Client disconnected: ${client.id} (User ID: ${userId})`);
        break;
      }
    }
  }

  getUserSocketId(userId: string): string | undefined {
    return this.users.get(userId);
  }

  emitToUser(userId: string, event: string, data: any): void {
    const socketId = this.getUserSocketId(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }
}
