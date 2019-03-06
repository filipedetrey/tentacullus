"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const moongose = require("mongoose");
const corsMiddleware = require("restify-cors-middleware");
const io = require("socket.io");
const config_1 = require("../common/config");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({ name: "Tentacullus API", version: '1.0.0' });
                this.io = io.listen(this.application.server);
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.listen(config_1.config.server, () => { resolve(this.application); });
                //routes
                for (let route of routers) {
                    route.applyRoutes(this.application);
                    route.applyWebsockets(this.io);
                }
                this.application.on('restifyError', error_handler_1.handleError);
                const corsOptions = {
                    preflightMaxAge: 10,
                    origins: ['http://localhost:4200'],
                    allowHeaders: [],
                    exposeHeaders: ['Access-Control-Allow-Origin']
                };
                const cors = corsMiddleware(corsOptions);
                this.application.pre(cors.preflight);
                this.application.use(cors.actual);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    initDb() {
        return moongose.connect(config_1.config.db.url, { useNewUrlParser: true });
    }
    bootstrap(routes = []) {
        return this.initDb().then(() => this.initRoutes(routes).then(() => this));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map