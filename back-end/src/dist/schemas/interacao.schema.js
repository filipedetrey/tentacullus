"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
exports.interacaoSchema = new moongose.Schema({
    pessoa: { type: moongose.Schema.Types.ObjectId, required: true },
    data: { type: Date, required: true, default: Date.now },
    dataAlteracao: { type: Date, required: false },
    texto: { type: String, required: true },
});
exports.Interacao = moongose.model('Interacao', exports.interacaoSchema);
//# sourceMappingURL=interacao.schema.js.map