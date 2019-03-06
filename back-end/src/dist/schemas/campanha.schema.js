"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.campanhaSchema = new moongose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório."], unique: true },
    dataCriacao: { type: Date, required: false, default: Date.now },
    arquivado: { type: Boolean, required: false, default: false },
    briefing: { type: String, required: false },
    cliente: { type: moongose.Schema.Types.ObjectId, ref: "Cliente", required: [true, "Cliente é obrigatório."] }
});
exports.campanhaSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.Campanha = moongose.model('Campanha', exports.campanhaSchema);
//# sourceMappingURL=campanha.schema.js.map