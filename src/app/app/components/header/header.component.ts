import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeUrl$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.activeUrl$ = this.store.select(fromStore.selectUrl);
  }
}
