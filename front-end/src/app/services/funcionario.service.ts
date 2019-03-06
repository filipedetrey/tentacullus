import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FuncionarioService extends AbstractService<Funcionario> {

    constructor(http: HttpClient) {
        super('funcionarios', http);
    }
}
