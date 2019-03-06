import * as moongose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { Funcionario } from './funcionario.schema'
import { Cliente } from './cliente.schema'

export const contaSchema = new moongose.Schema({
    usuario: { type: String, unique: true, required: [true, "Usuário é obrigatório."] },
    senha: { type: String, required: [true, "Senha é obrigatória."], select: false },
    pessoa: { type: moongose.Schema.Types.ObjectId, refPath: 'tipo', required: [true, "Pessoa é obrigatória."] },
    tipo: { type: String, enum: ['FUNCIONARIO', 'CLIENTE'], required: [true, "Tipo é obrigatório."] }
})

contaSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

export const Conta = moongose.model('Conta', contaSchema)

export interface Conta extends moongose.Document {
    usuario?: string;
    senha?: string;
    pessoa?: moongose.Types.ObjectId | Funcionario | Cliente;
}