import { Component } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import * as crypto from "crypto-js"; 

const apiUrl = "172.23.203.14";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

registrado = false;
clave = undefined;
Hash = "vacio"
body = {"mensaje" : "hola"}

constructor(private http:HttpClient){


}
register(){
  this.getData()
    .subscribe(res => {
        console.log(res)
        console.log(res[0].lastBlock)
        this.registrado = true
        this.proofOfWork(res[0].lastBlock.previous_hash)
      
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
      if (res == "success"){
        this.clave = res[0];
    }//loading.dismiss();
    }, err => {
      console.log(err);
      //loading.dismiss();
    });
}

getData(): Observable<any> {
  let response1 = this.http.post('http://172.23.206.14:5000'+'/nodes/register',this.body);
  return forkJoin([response1]);
}

proofOfWork(lastProof) {
  let proof = 0;
  while (!this.validProof(lastProof, proof)) {
    console.log(proof)
    proof += 1;
  }
  let response1 = this.http.post('http://172.23.206.14:5000'+'/ganador',{"Hash" : this.Hash})
  return proof;
}

validProof(lastProof, proof) {
  let guess = `${lastProof}${proof}`;
  let vacio = setTimeout(()=> {
    
  },1000)
  let guessHash = crypto.SHA256(guess).toString(crypto.enc.Hex);
  this.Hash = guessHash;
  return guessHash.slice(0, 2) === '00';
}


}
