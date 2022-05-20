"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let joinedUsers = new Map();
const SocketIO = (socket, io) => {
    socket.on('send signal', ({ signal, userToSignal, from }) => {
        console.log(userToSignal);
        io.to(userToSignal.socketID).emit('connenct with joining user', {
            signal,
            joiningUser: from,
            userConnecting: userToSignal,
        });
    });
    socket.on('returning signal', ({ sg: signal, joiningUser, returnedFrom }) => {
        io.to(joiningUser.socketID).emit('recieved returning signal', {
            signal,
            returnedFrom,
        });
    });
    socket.on('user joined', async ({ user, Room }) => {
        if (!joinedUsers.has(Room)) {
            joinedUsers.set(Room, [{ user, socketID: socket.id }]);
        }
        else {
            const users = joinedUsers.get(Room);
            users === null || users === void 0 ? void 0 : users.push({ user, socketID: socket.id });
            joinedUsers.set(Room, users);
        }
        socket.join(Room);
        console.log(joinedUsers);
        io.to(socket.id).emit('roomates', { joinedUsers: joinedUsers.get(Room) });
    });
    socket.on('disconnect', () => {
        joinedUsers.forEach((users, room) => {
            let socketHere = false;
            users === null || users === void 0 ? void 0 : users.every((u) => {
                if (u.socketID == socket.id) {
                    socketHere = true;
                    return false;
                }
                return true;
            });
            if (socketHere) {
                let newRoomUsers = [];
                users === null || users === void 0 ? void 0 : users.forEach((user) => {
                    if (user.socketID !== socket.id) {
                        newRoomUsers.push(user);
                    }
                });
                joinedUsers.set(room, newRoomUsers);
                io.to(room).emit('user left', {
                    joinedUsers: joinedUsers.get(room),
                    socket: socket.id,
                });
            }
        });
    });
    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('callUser/client', {
            signal: signalData,
            from,
            name,
        });
    });
    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    });
};
exports.default = SocketIO;