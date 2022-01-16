import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NavigatorService } from '../navigator.service';

interface Page {
  name: string,
  page: number
}

@Component({
  selector: "app-nav-favorites",
  templateUrl: "./nav-favorites.component.html",
  styleUrls: ["./nav.component.scss"]
})

export class NavFavoritesComponent implements OnInit {

  @Output() onNavigation: EventEmitter<boolean> = new EventEmitter();

  page: number;

  pages: Page[] = [
    {
      name: 'Etusivu',
      page: 100,
    },
    {
      name: 'Kotimaa',
      page: 102,
    },
    {
      name: 'Ulkomaat',
      page: 130,
    },
    {
      name: 'Talous',
      page: 160
    },
    {
      name: 'Korot ja valuuttakurssit',
      page: 173
    },
    {
      name: 'Päähakemisto',
      page: 199
    },
    {
      name: 'Urheilun pääsivu',
      page: 200
    },
    {
      name: 'Urheilun otsikot',
      page: 201
    },
    {
      name: 'Palloilu',
      page: 220
    },
    {
      name: 'Liiga',
      page: 221
    },
    {
      name: 'NHL',
      page: 235
    },
    {
      name: 'TV',
      page: 300
    },
    {
      name: 'TVssä nyt',
      page: 320
    },
    {
      name: 'YLEn urheilulähetykset',
      page: 355
    },
    {
      name: 'Urheilun tapahtumasivu',
      page: 610
    },
    {
      name: 'Jalkapallon Eurosarjat',
      page: 670
    },
    {
      name: 'Valioliiga',
      page: 674
    }
  ];

  constructor (private nav: NavigatorService) {

  }

  ngOnInit (){
    
  }

  public select(page: Page) : void {
    this.nav.gotoPage(page.page);
    this.onNavigation.emit(true);
  }

  public clear() : void {
    this.page = null;    
  }

  public enter() : void {
    if (!this.page || this.page < 100 || this.page > 900) {      
      return;
    }    
    this.nav.gotoPage(this.page);    
    this.onNavigation.emit(true);
  }
  
  

}
