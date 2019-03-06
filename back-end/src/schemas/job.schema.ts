import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { Funcionario } from './funcionario.schema'
import { Campanha } from './campanha.schema'
import { Cliente } from './cliente.schema'
import { Status } from './status.schema'
import { Processo } from './processo.schema';
import { Etapa } from './etapa.schema';
import { NotFoundError } from 'restify-errors';

export const interacaoSchema = new mongoose.Schema({
    texto: { type: String, required: [true, "Texto é obrigatório."], minlength: 1 },
    pessoa: { type: mongoose.Schema.Types.ObjectId, refPath: 'tipo', required: [true, "Pessoa é obrigatório."] },
    tipo: { type: String, enum: ["FUNCIONARIO", "CLIENTE"], required: [true, "Tipo é obrigatório."] },
    dataCriacao: { type: Date, required: false, default: Date.now },
    editado: { type: Date, required: false }
})

export const jobSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório"] },
    campanha: { type: mongoose.Schema.Types.ObjectId, ref: "Campanha", required: [true, "Campanha é obrigatório."] },
    processo: { type: mongoose.Schema.Types.ObjectId, ref: "Processo", required: [true, "Processo é obrigatório."] },
    etapaAtual: { type: mongoose.Schema.Types.ObjectId, ref: "Processo.etapas", required: [true, "Etapa é obrigatório."] },
    envolvidos: { type: [mongoose.Schema.Types.ObjectId], ref: "Funcionario", required: false, default: [] },
    status: { type: mongoose.Schema.Types.ObjectId, ref: "Status", required: false, default: null },
    briefing: { type: String, required: false, select: false },
    dataInterna: { type: Date, required: false },
    dataExterna: { type: Date, required: false },
    interacoes: { type: [interacaoSchema], required: false, default: [], select: false }
})

interacaoSchema.plugin(uniqueValidator, { message: 'deve ser único.' })
jobSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

jobSchema.statics.etapaDeletada = function (processo: mongoose.Types.ObjectId, nextEtapa: mongoose.Types.ObjectId) {
    return this.find({ "processo": processo })
        .select("etapaAtual processo")
        .exec()
        .then((jobs: Job[]) => {
            var retorno = { affecteds: [], _n: 0 }
            if (jobs) {
                jobs.forEach(job => {
                    if (job.etapaAtual === null) {
                        job.etapaAtual = nextEtapa
                        job.save()
                        retorno.affecteds.push(job)
                        retorno._n++
                    }
                })
            }
            return retorno
        })
}

export interface JobModel extends mongoose.Model<Job> {
    etapaDeletada(processo: mongoose.Types.ObjectId, nextEtapa: mongoose.Types.ObjectId)
}

export const Job = mongoose.model<Job, JobModel>("Job", jobSchema)

export interface Job extends mongoose.Document {
    nome?: string;
    campanha?: mongoose.Types.ObjectId | Campanha;
    processo?: mongoose.Types.ObjectId | Processo;
    etapaAtual?: mongoose.Types.ObjectId | Etapa;
    envolvidos?: [mongoose.Types.ObjectId | Funcionario];
    status?: [mongoose.Types.ObjectId | Status],
    briefing?: string;
    dataInterna?: Date,
    dataExterna?: Date,
    interacoes?: [mongoose.Types.ObjectId | Interacao]
}

export interface Interacao extends mongoose.Document {
    texto?: string;
    tipo?: mongoose.Types.ObjectId | Funcionario | Cliente;
    dataCriacao: Date;
    editado: Date;
}