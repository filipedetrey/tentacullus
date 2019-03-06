import { DadosBancarios } from "./comum/dadosBancarios";
import { Contato } from "./comum/contato";
import { Endereco } from "./comum/endereco";
import { Abstrata } from "./abstrata";

export interface Funcionario extends Abstrata{
    nomeFantasia?: string;
    email?: string;
    nomeCivil?: string;
    cpf?: string;
    rg?: string;
    dataNascimento?: string;
    dataAdmissao?: string;
    dataDemissao?: string;
    salarioBruto?: number;
    valorHora?: number;
    funcao?: string;
    beneficios?: string;
    observacoes?: string;
    portifolio?: string;
    dadosBancarios?: DadosBancarios,
    contato?: Contato,
    endereco?: Endereco
}
