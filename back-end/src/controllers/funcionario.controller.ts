import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Funcionario } from '../schemas/funcionario.schema';

class FuncionarioContoller extends Controller<Funcionario>{

    constructor() {
        super(Funcionario)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Funcionario, Funcionario>):
        mongoose.DocumentQuery<Funcionario, Funcionario> {
        return query
            .select('cpf rg dataAdmissao dataDemissao salarioBruto valorHora funcao beneficios observacoes portifolio')
            .populate('dadosBancarios')
            .populate('contato')
            .populate('endereco')
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}`, [this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
    }

}

export const funcionarioController = new FuncionarioContoller()