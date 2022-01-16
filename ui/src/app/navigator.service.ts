import { Injectable } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { action, observable } from 'mobx-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class NavigatorService {

  @observable
  public history: number[] = [];

  @observable
  public currentPage: number;

  @observable
  public loadedPage: string;

  @observable
  public loading: boolean = false;

  constructor(
    private router: Router,
    private ls: LocalStorageService,
    private http: HttpClient
  ) { 
    this.history = this.ls.get('history') || [];
  }

  @action
  private addToHistory(page: number) : void {
    this.history = this.history.filter(function(elem) {
        return elem !== page;
    });
    this.history.unshift(page);      
    while(this.history.length > 20) {
      this.history.pop();
    }
    this.ls.set('history', this.history);
  }

  @action
  public gotoPage(page: number) : void {    
    this.router.navigate(['/page/', page]);
  }

  public movePage(amount: number) : void {    
    this.setCurrentPage(this.currentPage + amount);
  }

  @action
  public setCurrentPage(page: number) : void {
    if (!page || page < 100 || page > 900) {
      page = 201;
    }
    this.currentPage = page;    
    this.loading = true;
    this.addToHistory(page);
    var obs = this.http.get<any>("/api/txt/" + page.toString());     
    obs.subscribe((response) => {
      this.loadedPage = response.content;
      this.loading = false;
    });
  }

  @action
  public reload(){
    this.setCurrentPage(this.currentPage);
  }

}
