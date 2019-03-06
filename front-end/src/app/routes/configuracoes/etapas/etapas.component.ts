import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { EtapaService } from '../../../services/etapa.service';
import { Etapa } from '../../../models/etapa';
import { SortablejsOptions } from 'angular-sortablejs';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { WebsocketService } from '../../../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent implements OnInit, OnDestroy {

  private etapas: Etapa[] = []
  private sortableOptions: SortablejsOptions = { sort: false }
  private currentDelete: Etapa = {}
  private subscription: Subscription

  @ViewChildren("pop")
  private popovers: QueryList<PopoverDirective>;

  constructor(private service: EtapaService, private websocket: WebsocketService) { }

  ngOnInit() {
    this.carregarEtapas()
    this.websocket.register(this.service.service)
    this.subscription = this.websocket.onMessage.subscribe(message => {
      if (message === this.service.service)
        this.carregarEtapas()
    })
  }

  ngOnDestroy() {
    this.websocket.unregister(this.service.service)
    this.subscription.unsubscribe()
  }

  carregarEtapas() {
    this.service.getAll().subscribe(
      response => { this.etapas = response.items },
      error => console.log(error)
    )
  }

  closePopovers() {
    this.popovers, this.popovers.toArray().forEach((p: PopoverDirective) => {
      if (p.isOpen)
        p.hide()
    })
  }

  setDelete(obj: Etapa) {
    this.currentDelete = obj
  }

  deleteEtapa() {
    this.service.delete(this.currentDelete._id).subscribe(
      response => {
        var objIndex = this.etapas.indexOf(this.currentDelete)
        this.etapas.splice(objIndex, 1)
      },
      error => {
        console.log(error)
      }
    )
  }

}
