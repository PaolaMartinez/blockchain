import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  showed = false;
  showed2 = false;


  infoButtonClick(){
    this.showed = !this.showed;
  }

  infoButtonClick2(){
    this.showed2 = !this.showed2;
  }
}