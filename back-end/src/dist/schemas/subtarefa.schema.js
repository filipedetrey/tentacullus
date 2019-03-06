"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
exports.subtarefaSchema = new moongose.Schema({
    nome: { type: String, required: true },
    prazo: { type: Date, required: false },
    concluido: { type: Boolean, required: true, default: false },
    responsavel: { type: moongose.Schema.Types.ObjectId, required: false },
    job: { type: moongose.Schema.Types.ObjectId, required: true }
});
exports.subtarefaSchema.index({ nome: 1, job: 1 }, { required: true });
exports.Subtarefa = moongose.model('Subtarefa', exports.subtarefaSchema);
//# sourceMappingURL=subtarefa.schema.js.map