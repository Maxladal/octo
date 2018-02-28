import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromCatalog from './store/catalog.reducer';
import * as catalogActions from './store/catalog.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogState: Observable<fromCatalog.State>;

  constructor(
    private store: Store<fromCatalog.AppState>
  ) {}

  ngOnInit() {
    this.catalogState = this.store.select('catalog');
    this.store.dispatch(new catalogActions.FetchTopicGroup(8));
  }

}