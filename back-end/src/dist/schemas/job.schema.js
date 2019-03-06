"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.interacaoSchema = new mongoose.Schema({
    texto: { type: String, required: [true, "Texto é obrigatório."], minlength: 1 },
    pessoa: { type: mongoose.Schema.Types.ObjectId, refPath: 'tipo', required: [true, "Pessoa é obrigatório."] },
    tipo: { type: String, enum: ["FUNCIONARIO", "CLIENTE"], required: [true, "Tipo é obrigatório."] },
    dataCriacao: { type: Date, required: false, default: Date.now },
    editado: { type: Date, required: false }
});
exports.jobSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório"] },
    campanha: { type: mongoose.Schema.Types.ObjectId, ref: "Campanha", required: [true, "Campanha é obrigatório."] },
    processo: { type: mongoose.Schema.Types.ObjectId, ref: "Processo", required: [true, "Processo é obrigatório."] },
    etapaAtual: { type: mongoose.Schema.Types.ObjectId, ref: "Processo.etapas", required: [true, "Etapa é obrigatório."] },
    envolvidos: { type: [mongoose.Schema.Types.ObjectId], ref: "Funcionario", required: false, default: [] },
    status: { type: mongoose.Schema.Types.ObjectId, ref: "Status", required: false, default: null },
    briefing: { type: String, required: false, select: false },
    dataInterna: { type: Date, required: false },
    dataExterna: { type: Date, required: false },
    interacoes: { type: [exports.interacaoSchema], required: false, default: [], select: false }
});
exports.interacaoSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.jobSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.jobSchema.statics.etapaDeletada = function (processo, nextEtapa) {
    return this.find({ "processo": processo })
        .select("etapaAtual processo")
        .exec()
        .then((jobs) => {
        var retorno = { affecteds: [], _n: 0 };
        if (jobs) {
            jobs.forEach(job => {
                if (job.etapaAtual === null) {
                    job.etapaAtual = nextEtapa;
                    job.save();
                    retorno.affecteds.push(job);
                    retorno._n++;
                }
            });
        }
        return retorno;
    });
};
exports.Job = mongoose.model("Job", exports.jobSchema);
//# sourceMappingURL=job.schema.js.map