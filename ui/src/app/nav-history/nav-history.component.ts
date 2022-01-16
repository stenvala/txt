import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NavigatorService } from '../navigator.service';

@Component({
  selector: "app-nav-history",
  templateUrl: "./nav-history.component.html",
  styleUrls: ["./../nav-favorites/nav.component.scss"]
})
export class NavHistoryComponent implements OnInit {

  @Output() onNavigation: EventEmitter<boolean> = new EventEmitter();

  constructor (public nav: NavigatorService) {

  }

  ngOnInit (){

  }

    public select(page: number) : void{
    this.nav.gotoPage(page);
    this.onNavigation.emit(true);
  }

  
}
