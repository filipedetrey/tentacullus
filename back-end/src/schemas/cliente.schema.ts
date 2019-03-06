import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { regex } from '../common/validators'
import { bancoSchema, DadosBancarios } from './common/banco.schema'
import { contatoSchema, Contato } from './common/contato.schema'
import { enderecoSchema, Endereco } from './common/endereco.schema'

const clienteSchema = new mongoose.Schema({

    nomeFantasia: { type: String, unique: true, required: [true, "Nome fantasia é obrigatório."] },
    email: { type: String, unique: true, required: [true, "Email é obrigatório"], match: [regex.email, "Email inválido."] },
    nomeCivil: { type: String, required: false },
    cpf: { type: String, required: false, select: false },
    rg: { type: String, required: false, select: false },
    razaoSocial: { type: String, required: false, select: false },
    cnpj: { type: String, unique: true, required: false, select: false },
    inscricaoEstadual: { type: String, required: false, select: false },
    inscricaoMunicipal: { type: String, required: false, select: false },
    dadosBancarios: { type: [bancoSchema], required: false, select: false },
    contato: { type: [contatoSchema], required: false, select: false },
    endereco: { type: [enderecoSchema], required: false, select: false },
})

clienteSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

export const Cliente = mongoose.model('Cliente', clienteSchema)

export interface Cliente extends mongoose.Document {
    nomeFantasia?: string;
    email?: string;
    nomeCivil?: string;
    cpf?: string;
    rg?: string;
    razaoSocial?: string;
    cnpj?: string;
    inscricaoEstadual?: string;
    inscricaoMunicipal?: string;
    dadosBancarios?: DadosBancarios,
    contato?: Contato,
    endereco?: Endereco
}