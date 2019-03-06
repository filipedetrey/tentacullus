import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { Funcionario } from './funcionario.schema'
import { Processo } from './processo.schema'

export const etapaSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório."], unique: true },
    envolvidos: { type: [mongoose.Schema.Types.ObjectId], ref: "Funcionario", default: [], select: false },
    notificarEnvolvidosEntrar: { type: Boolean, required: true, default: false, select: false },
    notificarClienteEntrar: { type: Boolean, required: true, default: false, select: false },
    notificarEnvolvidosSair: { type: Boolean, required: true, default: false, select: false },
    notificarClienteSair: { type: Boolean, required: true, default: false, select: false },
})

etapaSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

export const Etapa = mongoose.model('Etapa', etapaSchema)

export interface Etapa extends mongoose.Document {
    nome?: string;
    processo?: mongoose.Types.ObjectId | Processo;
    envolvidos?: [mongoose.Types.ObjectId | Funcionario];
    notificarEnvolvidosEntrar?: boolean;
    notificarClienteEntrar?: boolean;
    notificarEnvolvidosSair?: boolean;
    notificarClienteSair?: boolean;
}