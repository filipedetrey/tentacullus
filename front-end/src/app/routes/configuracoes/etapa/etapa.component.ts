import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EtapaService } from '../../../services/etapa.service';
import { WebsocketService } from '../../../services/websocket.service';
import { Etapa } from '../../../models/etapa';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit, OnDestroy {

  private funcionarios: Funcionario[]
  private etapa: Etapa = {}
  private subs: Subscription[] = []
  private button: string
  private errors = {}

  constructor(
    private websocket: WebsocketService,
    private service: EtapaService,
    private funService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private config: NgSelectConfig
  ) { 
    this.config.notFoundText = "Nenhuma etapa encontrada."
  }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.button = "Editar"
        this.carregarEtapa(routeParams.id)
        this.websocket.register(this.service.service)
        this.subs.push(
          this.websocket.onMessage.subscribe(message => {
            if (message === this.service.service)
              this.carregarEtapa(routeParams.id)
          })
        )
      } else { this.button = "Criar" }
    });

    this.carregarFuncionarios()

    this.websocket.register(this.funService.service)
    this.subs.push(
      this.websocket.onMessage.subscribe(message => {
        if (message === this.funService.service)
          this.carregarFuncionarios()
      })
    )
  }

  ngOnDestroy() {
    this.websocket.unregister(this.service.service)
    this.websocket.unregister(this.funService.service)
    this.subs.forEach(sub => sub.unsubscribe())
  }

  carregarEtapa(id: string) {
    this.service.get(id).subscribe(
      response => { this.etapa = response },
      error => { this.router.navigateByUrl('/configuracoes/etapas') }
    )
  }

  carregarFuncionarios() {
    this.funService.getAll().subscribe(response => { this.funcionarios = response.items })
  }

  criarOuEditar() {
    if (this.button === "Editar") {
      this.service.patch(this.etapa._id, this.etapa).subscribe(
        response => { this.router.navigateByUrl('/configuracoes/etapas') },
        error => { this.errors = error.error }
      )
    }
    else {
      this.service.post(this.etapa).subscribe(
        response => { this.router.navigateByUrl('/configuracoes/etapas') },
        error => { this.errors = error.error, console.log(this.errors) }
      )
    }
  }

}
