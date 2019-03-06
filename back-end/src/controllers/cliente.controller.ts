import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Cliente } from '../schemas/cliente.schema';

class ClienteController extends Controller<Cliente>{

    constructor() {
        super(Cliente)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Cliente, Cliente>):
        mongoose.DocumentQuery<Cliente, Cliente> {
        return query
            .select('cpf rg razaoSocial cnpj inscricaoEstadual inscricaoMunicipal')
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

export const clienteController = new ClienteController()