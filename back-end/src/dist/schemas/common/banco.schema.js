"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
exports.bancoSchema = new moongose.Schema({
    banco: { type: String, required: false, select: false },
    tipo: { type: String, required: false, select: false },
    agencia: { type: String, required: false, select: false },
    conta: { type: String, required: false, select: false },
    variacao: { type: String, required: false, select: false }
});
//# sourceMappingURL=banco.schema.js.map