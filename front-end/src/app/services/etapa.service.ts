import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Etapa } from '../models/etapa';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EtapaService extends AbstractService<Etapa> {

  constructor(http: HttpClient) {
    super('etapas', http);
  }
}
