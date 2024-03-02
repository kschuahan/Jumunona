import { io } from "socket.io-client";
import { BASE_URL } from "../Netowork/Constants";
import { localEnum } from "../Netowork/ApiEnum";

const socket = io(BASE_URL(localEnum.development));
export default socket;

export interface MessageModel {
    msg: string,
    from: string,
    to: string
}