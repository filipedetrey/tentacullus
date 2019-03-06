"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.etapaSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório."], unique: true },
    envolvidos: { type: [mongoose.Schema.Types.ObjectId], ref: "Funcionario", default: [], select: false },
    notificarEnvolvidosEntrar: { type: Boolean, required: true, default: false, select: false },
    notificarClienteEntrar: { type: Boolean, required: true, default: false, select: false },
    notificarEnvolvidosSair: { type: Boolean, required: true, default: false, select: false },
    notificarClienteSair: { type: Boolean, required: true, default: false, select: false },
});
exports.etapaSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.Etapa = mongoose.model('Etapa', exports.etapaSchema);
//# sourceMappingURL=etapa.schema.js.map