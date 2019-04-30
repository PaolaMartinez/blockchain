import { Component } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
const apiUrl = "172.23.203.14";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

registrado = false;
clave = undefined;
body = {}

constructor(private http:HttpClient){


}
register(){
  this.getData()
    .subscribe(res => {
      if (res) {this.registrado = true}
      //loading.dismiss();
    }, err => {
      console.log(err);
      //loading.dismiss();
    });
  
}

async getData2() {
  // const loading = await this.loadingController.create({
  //   message: 'Loading'
  // });
  //await loading.present();
  this.getData()
    .subscribe(res => {
      console.log(res);
      this.clave = res[0];
      //loading.dismiss();
    }, err => {
      console.log(err);
      //loading.dismiss();
    });
}

getData(): Observable<any> {
  let response1 = this.http.post('172.23.203.14'+'/nodes/register',this.body);
  return forkJoin([response1]);
}
}
