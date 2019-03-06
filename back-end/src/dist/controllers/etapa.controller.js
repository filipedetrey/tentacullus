"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../common/controller");
const etapa_schema_1 = require("../schemas/etapa.schema");
const restify_errors_1 = require("restify-errors");
const processo_schema_1 = require("../schemas/processo.schema");
class EtapaController extends controller_1.Controller {
    constructor() {
        super(etapa_schema_1.Etapa);
        this.delete = (req, resp, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.n) {
                    processo_schema_1.Processo.etapaDeletada();
                    resp.send(204);
                    this.emit('delete');
                }
                else {
                    return next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
                }
                return next();
            })
                .catch(next);
        };
    }
    prepareOne(query) {
        return query.select('nome envolvidos notificarEnvolvidosEntrar notificarClienteEntrar notificarEnvolvidosSair notificarClienteSair');
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
exports.etapaController = new EtapaController();
//# sourceMappingURL=etapa.controller.js.map