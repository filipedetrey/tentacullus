"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validators_1 = require("../common/validators");
const banco_schema_1 = require("./common/banco.schema");
const contato_schema_1 = require("./common/contato.schema");
const endereco_schema_1 = require("./common/endereco.schema");
const clienteSchema = new mongoose.Schema({
    nomeFantasia: { type: String, unique: true, required: [true, "Nome fantasia é obrigatório."] },
    email: { type: String, unique: true, required: [true, "Email é obrigatório"], match: [validators_1.regex.email, "Email inválido."] },
    nomeCivil: { type: String, required: false },
    cpf: { type: String, required: false, select: false },
    rg: { type: String, required: false, select: false },
    razaoSocial: { type: String, required: false, select: false },
    cnpj: { type: String, unique: true, required: false, select: false },
    inscricaoEstadual: { type: String, required: false, select: false },
    inscricaoMunicipal: { type: String, required: false, select: false },
    dadosBancarios: { type: [banco_schema_1.bancoSchema], required: false, select: false },
    contato: { type: [contato_schema_1.contatoSchema], required: false, select: false },
    endereco: { type: [endereco_schema_1.enderecoSchema], required: false, select: false },
});
clienteSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.Cliente = mongoose.model('Cliente', clienteSchema);
//# sourceMappingURL=cliente.schema.js.map