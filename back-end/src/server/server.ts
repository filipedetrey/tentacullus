import * as restify from 'restify'
import * as moongose from 'mongoose'
import * as corsMiddleware from 'restify-cors-middleware'
import * as io from 'socket.io'
import { config } from '../common/config'
import { Router } from '../common/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'

export class Server {

    application: restify.Server
    io: io.Server

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({ name: "Tentacullus API", version: '1.0.0' });
                this.io = io.listen(this.application.server)
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.listen(config.server, () => { resolve(this.application) })
                //routes
                for (let route of routers) {
                    route.applyRoutes(this.application)
                    route.applyWebsockets(this.io)
                }

                this.application.on('restifyError', handleError)

                const corsOptions: corsMiddleware.Options = {
                    preflightMaxAge: 10,
                    origins: ['http://localhost:4200'],
                    allowHeaders: [],
                    exposeHeaders: ['Access-Control-Allow-Origin']
                }

                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)

                this.application.pre(cors.preflight)
                this.application.use(cors.actual)

            } catch (error) { reject(error); }
        })
    }

    initDb(): Promise<any> {
        return moongose.connect(config.db.url, { useNewUrlParser: true });
    }

    bootstrap(routes: Router[] = []): Promise<Server> {
        return this.initDb().then(() => this.initRoutes(routes).then(() => this))
    }


}