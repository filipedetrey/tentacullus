import { Abstrata } from "./abstrata";
import { Funcionario } from "./funcionario";

export interface Etapa extends Abstrata {
    nome?: string;
    envolvidos?: [string | Funcionario];
    notificarEnvolvidosEntrar?: boolean;
    notificarClienteEntrar?: boolean;
    notificarEnvolvidosSair?: boolean;
    notificarClienteSair?: boolean;
}
