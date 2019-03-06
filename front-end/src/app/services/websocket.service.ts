import { Injectable, OnDestroy, EventEmitter } from '@angular/core'
import { global } from '../consts/global.const'
import * as io from 'socket.io-client'

@Injectable()
export class WebsocketService implements OnDestroy {

  private socket: SocketIOClient.Socket
  public onMessage: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.socket = io(`${global.url}`)
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  register(message: string) {
    this.socket.on(message, () => { this.onMessage.emit(message) })
  }

  unregister(message: string) {
    this.socket.removeEventListener(message)
  }

}
