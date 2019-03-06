import { Injectable } from '@angular/core';
import { Status } from '../models/status';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';

@Injectable()
export class StatusService extends AbstractService<Status> {

  constructor(http: HttpClient) {
    super('status', http);
  }
}