"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const banco_schema_1 = require("./banco.schema");
const contato_schema_1 = require("./contato.schema");
const endereco_schema_1 = require("./endereco.schema");
const clienteSchema = new mongoose.Schema({
    nomeFantasia: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true, match: validators_1.regex.email },
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
exports.Cliente = mongoose.model('Cliente', clienteSchema);
//# sourceMappingURL=cliente.schema.js.map