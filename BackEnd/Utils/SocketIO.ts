import {Socket, Server} from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

let joinedUsers: {user: string, socketID: string}[] = [];

const SocketIO = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void => {

  socket.on("send signal", ({signal, userToSignal, from})=>{
    console.log(userToSignal)
    io.to(userToSignal.socketID).emit("connenct with joining user",{ signal, joiningUser: from, userConnecting: userToSignal  })
  })

  socket.on('returning signal', ({sg: signal, joiningUser, returnedFrom })=>{
    io.to(joiningUser.socketID).emit('recieved returning signal', { signal, returnedFrom });
  })

  socket.on("user joined", async ({user, Room})=>{
    console.log(`Room: ${Room}`)
    socket.join(Room);
    joinedUsers.push({user, socketID: socket.id})
    console.log(joinedUsers)
    io.to(socket.id).emit("roomates", joinedUsers);
  })

  /* socket.on("userLeft", async ({id, Room})=>{
    io.to(Room).emit("roomates", joinedUsers.filter(ju =>{
      ju.socketID != id
    }))
  }) */

  socket.emit("me", socket.id)

  socket.on("disconnect", ()=>{
    joinedUsers = joinedUsers.filter(ju =>
      ju.socketID != socket.id
    );
    io.emit('user left', joinedUsers)
  })
  
  socket.on('callUser', ({userToCall, signalData, from, name })=>{
    io.to(userToCall).emit("callUser/client", {signal: signalData, from, name})
  })

  socket.on("answerCall", (data)=>{
    io.to(data.to).emit("callAccepted", data.signal)
  }) 

}


export default SocketIO