import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Conta } from '../schemas/conta.schema';

class ContaController extends Controller<Conta>{

    constructor() {
        super(Conta)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Conta, Conta>):
        mongoose.DocumentQuery<Conta, Conta> {
        return query
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

export const contaController = new ContaController()