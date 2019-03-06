import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Controller } from '../common/controller';
import { Processo, EtapaProcesso } from '../schemas/processo.schema';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { Job } from '../schemas/job.schema';

class ProcessoContoller extends Controller<Processo>{

    constructor() {
        super(Processo)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Processo, Processo>):
        mongoose.DocumentQuery<Processo, Processo> {
        return query
            .select(["nome", "etapas"])
            .populate("etapas.etapa")
    }
    protected prepareOneToUse(query: mongoose.DocumentQuery<Processo, Processo>):
        mongoose.DocumentQuery<Processo, Processo> {
        return query
            .select(["nome", "etapas"])
    }

    protected prepareAll(query: mongoose.DocumentQuery<Processo[], Processo>):
        mongoose.DocumentQuery<Processo[], Processo> {
        return query
    }

    validId = (req, res, next) => {
        if (
            !mongoose.Types.ObjectId.isValid(req.params.processoId) ||
            !mongoose.Types.ObjectId.isValid(req.params.etapaId)
        ) {
            next(new NotFoundError('Documento não encontrado.'))
        } else {
            next()
        }
    }

    addEtapa = (req, res, next) => {
        Processo.addEtapa(req.params.processoId, req.body)
            .then(this.render(res, next))
            .catch(next)
    }

    replaceEtapa = (req, res, next) => {
        Processo.replaceEtapa(req.params.processoId, req.params.etapaId, req.body)
            .then(this.render(res, next))
            .catch(next)
    }

    deleteEtapa = (req, res, next) => {
        Job.etapaDeletada(req.params.etapaId)
        Processo.deleteEtapaFromProcesso(req.params.processoId, req.params.etapaId)
            .then(this.render(res, next))
            .catch(next)
    }

    applyRoutes(application: restify.Server) {
        application.get('/processos', this.findAll)
        application.get('/processos/:id', [this.validateId, this.findById])
        application.post('/processos', this.save)
        application.put('/processos/:id', [this.validateId, this.replace])
        application.patch('/processos/:id', [this.validateId, this.update])
        application.del('/processos/:id', [this.validateId, this.delete])

        application.post('/processos/:processoId/etapa', [this.addEtapa])
        application.put('/processos/:processoId/etapa/:etapaId', [this.validId, this.replaceEtapa])
        application.del('/processos/:processoId/etapa/:etapaId', [this.validId, this.deleteEtapa])
    }

}

export const processoController = new ProcessoContoller()