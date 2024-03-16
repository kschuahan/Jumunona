import { Socket, io } from "socket.io-client";
import { BASE_URL } from "../Netowork/Constants";
import { localEnum } from "../Netowork/ApiEnum";
import { userData } from "./AsyncStorage";

let socket: Socket = null;

const getSocket = async () => {

    socket = await io(BASE_URL(localEnum.production))
    socket.on('connect', () => {
        console.warn(socket.id) // true

    });
    socket.emit("add-user", userData.userID)
    socket.on("add-user", (userId: any) => {
        console.warn("add-user", userId)
    });

    return socket

}
export default getSocket;

export interface MessageModel {
    msg: string,
    from: string,
    to: string
}