"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.statusSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório"], unique: true },
    cor: { type: String, required: [true, "Cor é obrigatório"] },
    posicao: { type: Number, required: [true, "Posição é obrigatório"] }
});
exports.statusSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.Status = mongoose.model('Status', exports.statusSchema);
//# sourceMappingURL=status.schema.js.map