"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../common/controller");
const cliente_schema_1 = require("../schemas/cliente.schema");
class ClienteController extends controller_1.Controller {
    constructor() {
        super(cliente_schema_1.Cliente);
    }
    prepareOne(query) {
        return query
            .select('cpf rg razaoSocial cnpj inscricaoEstadual inscricaoMunicipal')
            .populate('dadosBancarios')
            .populate('contato')
            .populate('endereco');
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
exports.clienteController = new ClienteController();
//# sourceMappingURL=cliente.controller.js.map