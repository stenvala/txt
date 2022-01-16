import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigatorService } from '../navigator.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {  

  constructor(private route: ActivatedRoute,
    public nav: NavigatorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      let page = parseInt(params['page']);      
      this.nav.setCurrentPage(page);
    });
  }

  click(event: any) : void {    
    var num = parseInt(event.target.innerHTML);
    if (num && num >= 100 && num < 900) {
      this.nav.gotoPage(num);
    }
  }



}
