import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export const statusSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório"], unique: true },
    cor: { type: String, required: [true, "Cor é obrigatório"] },
    posicao: { type: Number, required: [true, "Posição é obrigatório"] }
})

statusSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

export const Status = mongoose.model('Status', statusSchema)

export interface Status extends mongoose.Document {
    nome?: string;
    cor?: string;
    posicao?: number;
}