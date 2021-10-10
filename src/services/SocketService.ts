import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

type SocketConnect = Socket<DefaultEventsMap, DefaultEventsMap>

export class SocketService {

    static connect() {
        const socket = io('ws://localhost:3000')
        socket.on('connect', this.initSubscribers.bind(this, socket))
    }

    static initSubscribers(socket: SocketConnect) {
        socket.on('hello', () => {
            console.log('Hello');
        })
    }
}