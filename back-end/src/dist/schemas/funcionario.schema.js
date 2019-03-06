"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validators_1 = require("../common/validators");
const banco_schema_1 = require("./common/banco.schema");
const contato_schema_1 = require("./common/contato.schema");
const endereco_schema_1 = require("./common/endereco.schema");
const funcionarioSchema = new mongoose.Schema({
    nomeFantasia: { type: String, unique: true, required: [true, "Nome Fantasia é obrigatório."] },
    email: { type: String, unique: true, match: validators_1.regex.email, required: [true, "Email é obrigatório."] },
    nomeCivil: { type: String, required: [true, "Nome Civil é obrigatório."] },
    dataNascimento: { type: Date, required: [true, "Data de Nascimento é obrigatória."] },
    cpf: { type: String, required: false, select: false },
    rg: { type: String, required: false, select: false },
    dataAdmissao: { type: Date, required: false, select: false },
    dataDemissao: { type: Date, required: false, select: false },
    salarioBruto: { type: Number, required: false, select: false },
    valorHora: { type: Number, required: false, select: false },
    funcao: { type: String, required: false, select: false },
    beneficios: { type: [String], required: false, select: false },
    observacoes: { type: String, required: false, select: false },
    portifolio: { type: String, required: false, select: false },
    dadosBancarios: { type: [banco_schema_1.bancoSchema], required: false, select: false },
    contato: { type: [contato_schema_1.contatoSchema], required: false, select: false },
    endereco: { type: [endereco_schema_1.enderecoSchema], required: false, select: false },
});
funcionarioSchema.plugin(uniqueValidator, { message: 'deve ser único.' });
exports.Funcionario = mongoose.model('Funcionario', funcionarioSchema);
//# sourceMappingURL=funcionario.schema.js.map