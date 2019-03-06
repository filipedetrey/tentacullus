import { Abstrata } from "./abstrata";

export interface Status extends Abstrata {
    nome?: string;
    cor?: string;
    posicao?: number;
    editando?: boolean;
}
