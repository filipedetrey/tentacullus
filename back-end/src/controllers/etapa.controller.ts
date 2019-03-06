import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Etapa } from '../schemas/etapa.schema';
import { NotFoundError } from 'restify-errors';
import { Processo } from '../schemas/processo.schema';
import { Job } from '../schemas/job.schema';

class EtapaController extends Controller<Etapa>{

    constructor() {
        super(Etapa)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Etapa, Etapa>):
        mongoose.DocumentQuery<Etapa, Etapa> {
        return query.select('nome envolvidos notificarEnvolvidosEntrar notificarClienteEntrar notificarEnvolvidosSair notificarClienteSair')
    }

    delete = (req, resp, next) => {
        this.model.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
            if (cmdResult.n) {
                Processo.etapaDeletada()
                resp.send(204)
                this.emit('delete')
            } else {
                return next(new NotFoundError('Documento não encontrado.'))
            }
            return next()
        })
            .catch(next)
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

export const etapaController = new EtapaController()