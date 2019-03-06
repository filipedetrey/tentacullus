import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Job } from '../schemas/job.schema';
import { Processo } from '../schemas/processo.schema';

class JobController extends Controller<Job>{

    constructor() {
        super(Job)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Job, Job>):
        mongoose.DocumentQuery<Job, Job> {
        return query
    }

    save = (req, resp, next) => {
        let document = new this.model(req.body)
        Processo.findById(document.processo)
            .select("etapas")
            .exec()
            .then((processo) => {
                if (processo) {
                    document.etapaAtual = processo.etapas.length > 0 ? processo.etapas[0] : null
                }
            })
            .then(
                () => {
                    document.save()
                        .then(this.render(resp, next))
                        .then(() => { this.emit('save') })
                        .catch(next)
                }
            )
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

export const jobController = new JobController()