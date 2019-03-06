import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { Etapa } from './etapa.schema'
import { NotFoundError } from 'restify-errors';
import { Job } from './job.schema';

const etapaProcessoSchema = new mongoose.Schema({
    etapa: { type: mongoose.Schema.Types.ObjectId, ref: "Etapa", required: [true, "Etapa é obrigatório."] },
    posicao: { type: Number, required: [true, "Posição é obrigatório."] }
})

const processoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório."], unique: true },
    etapas: { type: [etapaProcessoSchema], required: false, default: [], select: false }
})

processoSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

processoSchema.statics.replaceEtapa = function (processo: string, etapaId: string, etapa: EtapaProcesso, next) {
    return this.findById(processo)
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((p: Processo) => {
            if (p) {
                var etapaIndex = p.etapas.map(e => e.id).indexOf(etapaId)
                if (etapaIndex > -1) {
                    p.etapas[etapaIndex] = etapa
                    p.save()
                    return p
                }
                else {
                    throw new NotFoundError("Etapa não encontrada")
                }
            }
            else {
                throw new NotFoundError("Processo não encontrado")
            }
        })
}

processoSchema.statics.deleteEtapaFromProcesso = function (processo: string, etapa: string) {
    return this.findById(processo)
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((p: Processo) => {
            if (p) {
                var etapaIndex = p.etapas.map(e => e.id).indexOf(etapa)
                if (etapaIndex > -1) {
                    p.etapas.splice(etapaIndex, 1)
                    p.save()
                    if (etapaIndex > 0)
                        Job.etapaDeletada(p._id, p.etapas[etapaIndex - 1]._id)
                    else
                        Job.etapaDeletada(p._id, null)
                    return p
                }
                else {
                    throw new NotFoundError("Etapa não encontrada")
                }
            }
            else {
                throw new NotFoundError("Processo não encontrado")
            }
        })
}

processoSchema.statics.etapaDeletada = function () {
    return this.find()
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((ps: Processo[]) => {
            if (ps) {
                var retorno = { affected: [], _n: 0 }
                ps.forEach(processo => {
                    var etapaIndex = processo.etapas.map(e => e.etapa).indexOf(null)
                    if (etapaIndex > -1) {
                        processo.etapas.splice(etapaIndex, 1)
                        retorno.affected.push(processo)
                        retorno._n++
                        processo.save()
                        if (etapaIndex > 0)
                            Job.etapaDeletada(processo._id, processo.etapas[etapaIndex - 1]._id)
                        else
                            Job.etapaDeletada(processo._id, null)
                    }
                })
                return retorno
            }
        })
}

processoSchema.statics.addEtapa = function (processo: string, etapa: EtapaProcesso) {
    return this.findById(processo)
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((p: Processo) => {
            if (p) {
                p.etapas.push(etapa)
                p.save()
                return p
            }
            else {
                throw new NotFoundError("Processo não encontrado")
            }
        })
}

export interface ProcessoModel extends mongoose.Model<Processo> {
    deleteEtapaFromProcesso(processo: string, etapa: string)
    etapaDeletada()
    replaceEtapa(processo: string, etapaId: string, etapa: EtapaProcesso)
    addEtapa(processo: string, etapa: EtapaProcesso)
}

export const Processo = mongoose.model<Processo, ProcessoModel>('Processo', processoSchema)

export interface EtapaProcesso extends mongoose.Document {
    etapa: mongoose.Types.ObjectId | Etapa;
    posicao: number;
}

export interface Processo extends mongoose.Document {
    nome?: string;
    etapas?: [EtapaProcesso];
}