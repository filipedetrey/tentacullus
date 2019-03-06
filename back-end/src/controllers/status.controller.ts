import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Status } from '../schemas/status.schema';
import { NotFoundError } from 'restify-errors';
import { Job } from '../schemas/job.schema';

class StatusController extends Controller<Status>{

    constructor() {
        super(Status)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Status, Status>)
        : mongoose.DocumentQuery<Status, Status> {
        return query
    }

    protected prepareAll(query: mongoose.DocumentQuery<Status[], Status>)
        : mongoose.DocumentQuery<Status[], Status> {
        return query.sort('posicao')
    }

    delete = (req, resp, next) => {
        Job.update({ "status": req.params.id }, { "status": undefined }, { multi: true }).exec().then(
            () => {
                this.model.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
                    if (cmdResult.n) {
                        resp.send(204)
                        this.emit('delete')
                    } else {
                        return next(new NotFoundError('Documento não encontrado.'))
                    }
                    return next()
                })
            }
        ).catch(next)

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

export const statusController = new StatusController()