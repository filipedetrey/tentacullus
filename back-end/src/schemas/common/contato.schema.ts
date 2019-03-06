import * as moongose from 'mongoose'
import { regex } from '../../common/validators';

export const contatoSchema = new moongose.Schema({
    telefone: { type: String, required: false, match: regex.telefone, select: false },
    celular: { type: String, required: false, match: regex.telefone, select: false },
    site: { type: String, required: false, select: false },
    facebook: { type: String, required: false, select: false },
    instagram: { type: String, required: false, select: false },
    twitter: { type: String, required: false, select: false }
})

export interface Contato extends moongose.Document {
    telefone?: string;
    celular?: string;
    site?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
}