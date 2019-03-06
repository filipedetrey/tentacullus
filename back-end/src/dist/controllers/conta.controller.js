"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../common/controller");
const conta_schema_1 = require("../schemas/conta.schema");
class ContaController extends controller_1.Controller {
    constructor() {
        super(conta_schema_1.Conta);
    }
    prepareOne(query) {
        return query;
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
exports.contaController = new ContaController();
//# sourceMappingURL=conta.controller.js.map