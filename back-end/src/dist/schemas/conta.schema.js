"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moongose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.contaSchema = new moongose.Schema({
    usuario: { type: String, unique: true, required: [true, "Usuário é obrigatório."] },
    senha: { type: String, required: [true, "Senha é obrigatória."], select: false },
    pessoa: { type: moongose.Schema.Types.ObjectId, refPath: 'tipo', required: [true, "Pessoa é obrigatória."] },
    tipo: { type: String, enum: ['FUNCIONARIO', 'CLIENTE'], required: [true, "Tipo é obrigatório."] }
});
exports.contaSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.Conta = moongose.model('Conta', exports.contaSchema);
//# sourceMappingURL=conta.schema.js.map