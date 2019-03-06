import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'searchbar',
  template: `
  <div class="form-group">
    <div>
      <input type="text" class="form-control" placeholder="Buscar" [(ngModel)]="search" #ipt (keyup)="onSearch($event.target.value)">
      <i class="fa fa-search"></i>
    </div>
  </div>
`,
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input()
  search: string = ""

  @Output()
  searchChange: EventEmitter<string> = new EventEmitter()

  private updated: Subject<string> = new Subject()

  constructor() { }

  ngOnInit() {
    this.updated
      .asObservable()
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe((val: string) => { this.searchChange.emit(val) });
  }

  onSearch(value: string) {
    this.updated.next(value)
  }

}
