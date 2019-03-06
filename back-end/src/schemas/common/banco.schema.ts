import * as moongose from 'mongoose'

export const bancoSchema = new moongose.Schema({
    banco: { type: String, required: false, select: false },
    tipo: { type: String, required: false, select: false },
    agencia: { type: String, required: false, select: false },
    conta: { type: String, required: false, select: false },
    variacao: { type: String, required: false, select: false }
})

export interface DadosBancarios extends moongose.Document{
    banco?: string;
    tipo?: string;
    agencia?: string;
    conta?: string;
    variacao?: string;
}