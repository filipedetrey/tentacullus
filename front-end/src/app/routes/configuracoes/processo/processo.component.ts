import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Etapa } from '../../../models/etapa';
import { Processo, EtapaProcesso } from '../../../models/processo';
import { WebsocketService } from '../../../services/websocket.service';
import { ProcessoService } from '../../../services/processo.service';
import { EtapaService } from '../../../services/etapa.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SortablejsOptions } from 'angular-sortablejs';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss']
})
export class ProcessoComponent implements OnInit, OnDestroy {

  private processo: Processo = {}
  private etapas: Etapa[] = []
  private subscriptions: Subscription[] = []
  private button: string
  private sortableOptions: SortablejsOptions = {
    handle: '.handle',
    onSort: (event: any) => { this.onSort() }
  }
  private etapaDelete: EtapaProcesso

  private create_etapa: Etapa;
  private create_error: boolean = false;

  private errors: any = {}

  @ViewChild("modal")
  private modal: ModalDirective

  @ViewChildren("pop")
  private popovers: QueryList<PopoverDirective>;

  constructor(
    private websocket: WebsocketService,
    private service: ProcessoService,
    private etapaService: EtapaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.button = "Editar"
        this.carregarProcesso(routeParams.id)
        this.websocket.register(this.service.service)
        this.subscriptions.push(
          this.websocket.onMessage.subscribe(message => {
            if (message === this.service.service)
              this.carregarProcesso(routeParams.id)
          })
        )
      } else { this.button = "Criar" }
    });

    this.carregarEtapas()
    this.websocket.register(this.etapaService.service)
    this.subscriptions.push(this.websocket.onMessage.subscribe(
      (message: string) => {
        if (message === this.etapaService.service)
          this.carregarEtapas()
      }
    ))

    this.subscriptions.push(this.modal.onHide.subscribe(() => {
      this.create_error = false;
    }))

  }

  ngOnDestroy() {
    this.websocket.unregister(this.service.service)
    this.websocket.unregister(this.etapaService.service)
    this.subscriptions.forEach(element => { element.unsubscribe() })
  }

  carregarEtapas() {
    this.etapaService.getAll().subscribe(
      response => { this.etapas = response.items },
      error => { console.log(error) }
    )
  }

  carregarProcesso(id: string) {
    this.service.get(id).subscribe(
      response => { this.processo = response },
      error => { console.log(error) }
    )
  }

  novaEtapa() {
    if (this.create_etapa !== undefined && this.create_etapa !== null) {
      var posicao: number = this.processo.etapas ? this.processo.etapas.length + 1 : 1
      var push: EtapaProcesso = { etapa: this.create_etapa, posicao }
      if (this.button === "Editar") { this.service.addEtapa(this.processo._id, push).subscribe() }
      this.processo.etapas ? this.processo.etapas.push(push) : this.processo.etapas = [push]
      this.create_etapa = undefined;
      this.modal.hide()
    }
    else this.create_error = true;
  }

  onSort() {
    this.processo.etapas.forEach(x => {
      x.posicao = this.processo.etapas.indexOf(x) + 1
    })

    if (this.button === "Editar") {
      this.service.patch(this.processo._id, this.processo).subscribe()
    }
  }

  setDelete(etapa: EtapaProcesso) {
    this.etapaDelete = etapa;
  }

  deleteEtapa() {
    var etapaIndex = this.processo.etapas.indexOf(this.etapaDelete)
    if (etapaIndex > -1) {
      if (this.button === "Editar") {
        this.service.deleteEtapa(this.processo._id, this.etapaDelete._id).subscribe()
      }
      this.processo.etapas.splice(etapaIndex, 1)
      this.etapaDelete = undefined
    }

  }

  closePopovers() {
    this.popovers, this.popovers.toArray().forEach((p: PopoverDirective) => {
      if (p.isOpen)
        p.hide()
    })
  }

  criarOuEditar() {
    if (this.button === "Editar") {
      this.service.patch(this.processo._id, this.processo).subscribe(
        response => { this.router.navigateByUrl('/configuracoes/processos') },
        error => { this.errors = error.error }
      )
    }
    else {
      this.service.post(this.processo).subscribe(
        response => { this.router.navigateByUrl('/configuracoes/processos') },
        error => { this.errors = error.error }
      )
    }
  }

}
