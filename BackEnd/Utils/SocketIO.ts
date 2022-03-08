import {Socket, Server} from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import { UserInterface } from "./userInterface";



const SocketIO = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {

  socket.on("user joined", async (room: string)=>{
    socket.join(room);
    const sockets = await io.in(room).fetchSockets();
    const joinedUsers: string[] = [];
    sockets.forEach(s=>{
      joinedUsers.push(s.id)
    }); 
    io.to(room).emit("roomates", joinedUsers)
  })


  socket.on("user left", async (room)=>{
    socket.leave(room);
    io.to(room).emit("userLeft/client", socket.id)

    const sockets = await io.in('room').fetchSockets();
    const joinedUsers: string[] = [];
    sockets.forEach(s=>{
      joinedUsers.push(s.id)
    }); 
    
    io.to(room).emit("roomates", joinedUsers)
  })

  socket.emit("me", socket.id)

  socket.on("disconnect", ()=>{
    socket.broadcast.emit("cancelled");
  })

  socket.on('callUser', ({userToCall, signalData, from, name })=>{
    io.to(userToCall).emit("callUser/client", {signal: signalData, from, name})
  })

  socket.on("answerCall", (data)=>{
    io.to(data.to).emit("callAccepted", data.signal)
  }) 

}


export default SocketIO