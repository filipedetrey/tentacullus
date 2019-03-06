import * as restify from 'restify'
import * as io from 'socket.io'
import { EventEmitter } from 'events'

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: restify.Server)

    abstract applyWebsockets(io: io.Server)

    envelope(document: any): any {
        return document
    }

    envelopeAll(documents: any[], options: any = {}): any {
        return documents
    }

    render(response: restify.Response, next: restify.Next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            }
            else {
                response.send(404)
            }
            return next()
        }
    }

    renderDocument(response: restify.Response, next: restify.Next, document) {
            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            }
            else {
                response.send(404)
            }
            return next()
    }

    renderAll(response: restify.Response, next: restify.Next, options: any = {}) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    array[index] = this.envelope(document)
                    this.emit('beforeRender', document)
                })
                response.json(this.envelopeAll(documents, options))
            } else {
                response.json(this.envelopeAll([]))
            }
        }
    }

}