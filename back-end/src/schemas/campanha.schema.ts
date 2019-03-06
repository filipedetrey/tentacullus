import * as moongose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

export const campanhaSchema = new moongose.Schema({
    nome: { type: String, required: [true, "Nome é obrigatório."], unique: true },
    dataCriacao: { type: Date, required: false, default: Date.now },
    arquivado: { type: Boolean, required: false, default: false },
    briefing: { type: String, required: false },
    cliente: { type: moongose.Schema.Types.ObjectId, ref: "Cliente", required: [true, "Cliente é obrigatório."] }
})

campanhaSchema.plugin(uniqueValidator, { message: 'deve ser único.' })

export const Campanha = moongose.model('Campanha', campanhaSchema)

export interface Campanha extends moongose.Document {
    nome?: string;
    dataCriacao?: Date;
    arquivado?: boolean
    briefing?: string;
    cliente?: string;
}