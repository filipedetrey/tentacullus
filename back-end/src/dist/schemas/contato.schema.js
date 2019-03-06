"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const validators_1 = require("../common/validators");
exports.contatoSchema = new moongose.Schema({
    telefone: { type: String, required: false, match: validators_1.regex.telefone, select: false },
    celular: { type: String, required: false, match: validators_1.regex.telefone, select: false },
    site: { type: String, required: false, select: false },
    facebook: { type: String, required: false, select: false },
    instagram: { type: String, required: false, select: false },
    twitter: { type: String, required: false, select: false }
});
//# sourceMappingURL=contato.schema.js.map