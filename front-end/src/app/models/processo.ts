import { Abstrata } from "./abstrata";
import { Etapa } from "./etapa";

export interface EtapaProcesso extends Abstrata {
    etapa: string | Etapa;
    posicao: number;
}

export interface Processo extends Abstrata {
    nome?: string;
    etapas?: [EtapaProcesso];
}
