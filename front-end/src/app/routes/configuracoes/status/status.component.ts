import { Component, OnInit, ViewChild, ElementRef, TemplateRef, QueryList, ViewChildren } from '@angular/core';
import { StatusService } from '../../../services/status.service';
import { Status } from '../../../models/status';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SortablejsOptions } from 'angular-sortablejs';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
      ]),
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class StatusComponent implements OnInit {

  private status: Status[] = []
  private statusCreate: Status = { nome: "", cor: "#555555" }
  private currentEdit: Status = {}
  private currentDelete: Status = {}
  private errors: any = {}

  private sortableOptions: SortablejsOptions = {
    handle: '.handle',
    onSort: (event: any) => { this.onSort() }
  }

  @ViewChild("modal")
  private modal: ModalDirective

  @ViewChild("cardFooter")
  private cardFooter: TemplateRef<HTMLElement>

  @ViewChildren("pop")
  private popovers: QueryList<PopoverDirective>;


  constructor(private service: StatusService) { }

  ngOnInit() {
    this.service
      .getAll()
      .subscribe(
        response => {
          this.status = response.items
          this.status.forEach(e => e.editando = false)
        },
        error => { console.log(error) }
      )
    this.modal.onHide.subscribe(() => { this.errors = {} })
  }

  resetCreate() {
    this.statusCreate.nome = ""
    this.statusCreate.cor = "#555555"
  }

  criarStatus() {

    this.statusCreate.posicao = this.status.length > 1 ? this.status.length + 1 : 0
    this.service.post(this.statusCreate).subscribe(
      response => {
        this.status.push(response)
        this.modal.hide()
        this.resetCreate()
      },
      err => { this.errors = err.error }
    )

  }

  onSort() {
    var patch: Status = {}
    this.status.forEach(s => {
      patch.posicao = this.status.indexOf(s) + 1
      patch.editando = undefined
      if (s.posicao !== patch.posicao)
        this.service.patch(s._id, patch).subscribe(
          res => {
            var objIndex = this.status.indexOf(s)
            this.status[objIndex] = res
            this.status[objIndex].editando = s.editando
          },
          err => console.log(err)
        )
    })
  }

  edit(obj: Status) {
    this.errors = {}
    var index = this.status.indexOf(obj)
    var editando = this.status[index].editando

    this.currentEdit.nome = this.status[index].nome
    this.currentEdit.cor = this.status[index].cor
    this.currentEdit._id = this.status[index]._id

    this.status.forEach(s => s.editando = false)
    this.status[index].editando = !editando
  }

  onEdit(obj: Status) {

    this.currentEdit.posicao = obj.posicao
    this.service.patch(this.currentEdit._id, this.currentEdit).subscribe(
      response => {
        var objIndex = this.status.indexOf(obj)
        this.status[objIndex] = response
        this.status[objIndex].editando = false
      },
      err => { this.errors = err.error }
    )

  }

  closePopovers() {
    this.popovers, this.popovers.toArray().forEach((p: PopoverDirective) => {
      if (p.isOpen)
        p.hide()
    })
  }

  setDelete(obj: Status) {
    this.currentDelete = obj
  }

  deleteStatus() {
    this.service.delete(this.currentDelete._id).subscribe(
      response => {
        var objIndex = this.status.indexOf(this.currentDelete)
        this.status.splice(objIndex, 1)
      },
      error => {
        console.log(error)
      }
    )
  }

}
