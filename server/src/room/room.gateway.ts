// import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { AccountService } from 'src/account/account.service';

// import { RoomService } from './room.service';

// @WebSocketGateway()
// export class RoomGateway {
//   constructor(private readonly roomService: RoomService, private readonly accountService: AccountService) {}

//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('joinRoom')
//   async joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any): Promise<WsResponse> {
//     socket.join(data.roomCode);
//     const account = await this.accountService.findById(data.accountId);
//     await this.roomService.join(account, data.roomCode);
//     return {
//       event: 'joinRoom',
//       data: {
//         displayName: account.displayName,
//         id: account.id,
//       },
//     };
//   }
// }