import { Socket, io } from "socket.io-client";
import { BASE_URL } from "../Netowork/Constants";
import { localEnum } from "../Netowork/ApiEnum";

let socket: Socket = null;

const getSocket = async () => {

    if (socket != null) {
        socket =  await io(BASE_URL(localEnum.development))
    }

   
    return socket
}
export default getSocket;

export interface MessageModel {
    msg: string,
    from: string,
    to: string
}