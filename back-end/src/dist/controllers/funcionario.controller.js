"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../common/controller");
const funcionario_schema_1 = require("../schemas/funcionario.schema");
class FuncionarioContoller extends controller_1.Controller {
    constructor() {
        super(funcionario_schema_1.Funcionario);
    }
    prepareOne(query) {
        return query
            .select('cpf rg dataAdmissao dataDemissao salarioBruto valorHora funcao beneficios observacoes portifolio')
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
exports.funcionarioController = new FuncionarioContoller();
//# sourceMappingURL=funcionario.controller.js.map