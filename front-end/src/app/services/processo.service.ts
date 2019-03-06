import { Injectable } from '@angular/core';
import { Processo, EtapaProcesso } from '../models/processo';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../consts/global.const'

@Injectable()
export class ProcessoService extends AbstractService<Processo> {

  constructor(http: HttpClient) {
    super('processos', http);
  }

  public addEtapa(processoId: string, params: EtapaProcesso): Observable<Processo> {
    return this.http.post<Processo>(`${global.url}${this.service}/${processoId}/etapa`, params)
  }

  public editEtapa(processoId: string, etapaId: string, params: EtapaProcesso): Observable<Processo> {
    return this.http.put<Processo>(`${global.url}${this.service}/${processoId}/etapa/${etapaId}`, params)
  }

  public deleteEtapa(processoId: string, etapaId: string): Observable<{ status: string }> {
    return this.http.delete<{ status: string }>(`${global.url}${this.service}/${processoId}/etapa/${etapaId}`)
  }

}
