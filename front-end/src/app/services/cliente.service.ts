import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService extends AbstractService<Cliente> {

    constructor(http: HttpClient) {
        super('clientes', http);
    }
}
