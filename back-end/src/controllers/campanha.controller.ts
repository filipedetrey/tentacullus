import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Campanha } from '../schemas/campanha.schema';

class CampanhaController extends Controller<Campanha>{

    constructor() {
        super(Campanha)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Campanha, Campanha>): mongoose.DocumentQuery<Campanha, Campanha> {
        return query.populate('cliente')
    }

    protected prepareAll(query : mongoose.DocumentQuery<Campanha[],Campanha>): mongoose.DocumentQuery<Campanha[], Campanha>{
        return query.populate('cliente')
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

export const campanhaController = new CampanhaController()