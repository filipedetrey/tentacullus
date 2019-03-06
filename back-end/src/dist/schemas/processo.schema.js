"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const restify_errors_1 = require("restify-errors");
const job_schema_1 = require("./job.schema");
const etapaProcessoSchema = new mongoose.Schema({
    etapa: { type: mongoose.Schema.Types.ObjectId, ref: "Etapa", required: [true, "Etapa é obrigatório."] },
    posicao: { type: Number, required: [true, "Posição é obrigatório."] }
});
const processoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório."], unique: true },
    etapas: { type: [etapaProcessoSchema], required: false, default: [], select: false }
});
processoSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
processoSchema.statics.replaceEtapa = function (processo, etapaId, etapa, next) {
    return this.findById(processo)
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((p) => {
        if (p) {
            var etapaIndex = p.etapas.map(e => e.id).indexOf(etapaId);
            if (etapaIndex > -1) {
                p.etapas[etapaIndex] = etapa;
                p.save();
                return p;
            }
            else {
                throw new restify_errors_1.NotFoundError("Etapa não encontrada");
            }
        }
        else {
            throw new restify_errors_1.NotFoundError("Processo não encontrado");
        }
    });
};
processoSchema.statics.deleteEtapaFromProcesso = function (processo, etapa) {
    return this.findById(processo)
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((p) => {
        if (p) {
            while (p.etapas.map(e => e.id).indexOf(etapa) !== -1) {
                var etapaIndex = p.etapas.map(e => e.id).indexOf(etapa);
                if (etapaIndex > 0)
                    job_schema_1.Job.etapaDeletada(p._id, p.etapas[etapaIndex]._id, p.etapas[etapaIndex - 1]._id);
                else
                    job_schema_1.Job.etapaDeletada(p._id, p.etapas[etapaIndex]._id, null);
                p.etapas.splice(etapaIndex, 1);
            }
            p.save();
            return p;
        }
        else {
            throw new restify_errors_1.NotFoundError("Processo não encontrado");
        }
    });
};
processoSchema.statics.etapaDeletada = function () {
    return this.find()
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((ps) => {
        if (ps) {
            var retorno = { affected: [], _n: 0 };
            ps.forEach(processo => {
                while (processo.etapas.map(e => e.etapa).indexOf(null) !== -1) {
                    var etapaIndex = processo.etapas.map(e => e.etapa).indexOf(null);
                    processo.etapas.splice(etapaIndex, 1);
                    retorno.affected.push(processo);
                    retorno._n++;
                    if (etapaIndex > 0)
                        job_schema_1.Job.etapaDeletada(processo._id, processo.etapas[etapaIndex]._id, processo.etapas[etapaIndex - 1]._id);
                    else
                        job_schema_1.Job.etapaDeletada(processo._id, processo.etapas[etapaIndex]._id, null);
                }
                processo.save();
            });
            return retorno;
        }
    });
};
processoSchema.statics.addEtapa = function (processo, etapa) {
    return this.findById(processo)
        .select(["nome", "etapas"])
        .populate("etapas.etapa")
        .exec()
        .then((p) => {
        if (p) {
            p.etapas.push(etapa);
            p.save();
            return p;
        }
        else {
            throw new restify_errors_1.NotFoundError("Processo não encontrado");
        }
    });
};
exports.Processo = mongoose.model('Processo', processoSchema);
//# sourceMappingURL=processo.schema.js.map