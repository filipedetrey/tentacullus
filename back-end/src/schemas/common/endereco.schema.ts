import * as moongose from 'mongoose'
import { regex } from '../../common/validators';

export const enderecoSchema = new moongose.Schema({
    cep: { type: String, required: false, match: regex.cep, select: false },
    endereco: { type: String, required: false, select: false },
    numero: { type: Number, required: false, select: false },
    complemento: { type: String, required: false, select: false },
    bairro: { type: String, required: false, select: false },
    estado: {
        type: String,
        enum: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO',
            'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR',
            'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
        required: false,
        select: false
    }
})

export interface Endereco extends moongose.Document{
    cep?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    estado?: string;
}