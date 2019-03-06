"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const controller_1 = require("../common/controller");
const processo_schema_1 = require("../schemas/processo.schema");
const restify_errors_1 = require("restify-errors");
class ProcessoContoller extends controller_1.Controller {
    constructor() {
        super(processo_schema_1.Processo);
        this.validId = (req, res, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.processoId) ||
                !mongoose.Types.ObjectId.isValid(req.params.etapaId)) {
                next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
            }
            else {
                next();
            }
        };
        this.addEtapa = (req, res, next) => {
            processo_schema_1.Processo.addEtapa(req.params.processoId, req.body)
                .then(this.render(res, next))
                .catch(next);
        };
        this.replaceEtapa = (req, res, next) => {
            processo_schema_1.Processo.replaceEtapa(req.params.processoId, req.params.etapaId, req.body)
                .then(this.render(res, next))
                .catch(next);
        };
        this.deleteEtapa = (req, res, next) => {
            processo_schema_1.Processo.deleteEtapaFromProcesso(req.params.processoId, req.params.etapaId)
                .then(this.render(res, next))
                .catch(next);
        };
    }
    prepareOne(query) {
        return query
            .select(["nome", "etapas"])
            .populate("etapas.etapa");
    }
    prepareOneToUse(query) {
        return query
            .select(["nome", "etapas"]);
    }
    prepareAll(query) {
        return query;
    }
    applyRoutes(application) {
        application.get('/processos', this.findAll);
        application.get('/processos/:id', [this.validateId, this.findById]);
        application.post('/processos', this.save);
        application.put('/processos/:id', [this.validateId, this.replace]);
        application.patch('/processos/:id', [this.validateId, this.update]);
        application.del('/processos/:id', [this.validateId, this.delete]);
        application.post('/processos/:processoId/etapa', [this.addEtapa]);
        application.put('/processos/:processoId/etapa/:etapaId', [this.validId, this.replaceEtapa]);
        application.del('/processos/:processoId/etapa/:etapaId', [this.validId, this.deleteEtapa]);
    }
}
exports.processoController = new ProcessoContoller();
//# sourceMappingURL=processo.controller.js.map