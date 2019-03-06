import { Abstrata } from "./abstrata";
import { Contato } from "./comum/contato";
import { Endereco } from "./comum/endereco";
import { DadosBancarios } from "./comum/dadosBancarios";

export interface Cliente extends Abstrata {
    nomeFantasia?: string;
    email?: string;
    nomeCivil?: string;
    cpf?: string;
    rg?: string;
    razaoSocial?: string;
    cnpj?: string;
    inscricaoEstadual?: string;
    inscricaoMunicipal?: string;
    dadosBancarios?: DadosBancarios,
    contato?: Contato,
    endereco?: Endereco
}
