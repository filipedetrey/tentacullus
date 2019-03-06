"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../common/controller");
const status_schema_1 = require("../schemas/status.schema");
const restify_errors_1 = require("restify-errors");
const job_schema_1 = require("../schemas/job.schema");
class StatusController extends controller_1.Controller {
    constructor() {
        super(status_schema_1.Status);
        this.delete = (req, resp, next) => {
            job_schema_1.Job.update({ "status": req.params.id }, { "status": undefined }, { multi: true }).exec().then(() => {
                this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                    if (cmdResult.n) {
                        resp.send(204);
                        this.emit('delete');
                    }
                    else {
                        return next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
                    }
                    return next();
                });
            }).catch(next);
        };
    }
    prepareOne(query) {
        return query;
    }
    prepareAll(query) {
        return query.sort('posicao');
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}
exports.statusController = new StatusController();
//# sourceMappingURL=status.controller.js.map