import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { regex } from '../common/validators'
import { bancoSchema, DadosBancarios } from './common/banco.schema'
import { contatoSchema, Contato } from './common/contato.schema'
import { enderecoSchema, Endereco } from './common/endereco.schema'

const funcionarioSchema = new mongoose.Schema({

    nomeFantasia: { type: String, unique: true, required: [true, "Nome Fantasia é obrigatório."] },
    email: { type: String, unique: true, match: regex.email, required: [true, "Email é obrigatório."] },
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
    dadosBancarios: { type: [bancoSchema], required: false, select: false },
    contato: { type: [contatoSchema], required: false, select: false },
    endereco: { type: [enderecoSchema], required: false, select: false },
})

funcionarioSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

export const Funcionario = mongoose.model('Funcionario', funcionarioSchema)

export interface Funcionario extends mongoose.Document {
    nomeFantasia?: string;
    email?: string;
    nomeCivil?: string;
    cpf?: string;
    rg?: string;
    dataNascimento?: string;
    dataAdmissao?: string;
    dataDemissao?: string;
    salarioBruto?: number;
    valorHora?: number;
    funcao?: string;
    beneficios?: string;
    observacoes?: string;
    portifolio?: string;
    dadosBancarios?: DadosBancarios,
    contato?: Contato,
    endereco?: Endereco
}