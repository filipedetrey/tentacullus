"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const validators_1 = require("../../common/validators");
exports.enderecoSchema = new moongose.Schema({
    cep: { type: String, required: false, match: validators_1.regex.cep, select: false },
    endereco: { type: String, required: false, select: false },
    numero: { type: Number, required: false, select: false },
    complemento: { type: String, required: false, select: false },
    bairro: { type: String, required: false, select: false },
    estado: {
        type: String,
        enum: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
            'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
            'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
        required: false,
        select: false
    }
});
//# sourceMappingURL=endereco.schema.js.map