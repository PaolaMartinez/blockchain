import { Component, NgZone } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {LoadingController} from '@ionic/angular'
import { forkJoin } from 'rxjs';
import * as crypto from "crypto-js"; 
import { promise } from 'protractor';


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
Hash2 = []
body = {"mensaje" : "hola"}
estado = "Ganador indefinido"

constructor(private http:HttpClient, private zone : NgZone,private paco : LoadingController){


}


register(){
  let controlador = this.paco.create({
    message: "Please wait ..."
  });
  controlador.then((res2) => {
    res2.present()
    this.getData()
    .subscribe(res => {
        console.log(res)
        console.log(res[0].lastBlock)
        this.registrado = true
        this.proofOfWork(res[0].lastBlock.previous_hash)
        res2.dismiss().then(dis => {
          console.log("dis")
        })
      //loading.dismiss();
    }, err => {
      console.log(err);
      res2.dismiss().then(dis => {
        console.log("dis")
      })
      //loading.dismiss();
    });


  })
  
  
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
  let response1 = this.http.post('http://192.168.10.101:5000'+'/nodes/register',this.body);
  return forkJoin([response1]);
}

proofOfWork(lastProof) {
  let proof = Math.floor(Math.random()*1000000);
  while (!this.validProof(lastProof, proof)) {
    proof += 1;
  }
  console.log("entre")
  this.http.post('http://192.168.10.101:5000'+'/ganador',{"Hash" : this.Hash}).subscribe((res : any) => {
  console.log(res)
  this.estado = res.message  
}, err => {
  console.log(err);
});

  console.log("sali")
}

  validProof(lastProof, proof) {
  let guess = `${lastProof}${proof}`;
  let guessHash = crypto.SHA256(guess).toString(crypto.enc.Hex);
  console.log(guessHash)

    this.Hash = guessHash
    let Hash1 =  guessHash.slice(0,31);
    let Hash2 =  guessHash.slice(32,64);
    this.Hash2.push(Hash1 + '\n' + Hash2)
    console.log("Intento Actualizarme")
  
  
  return guessHash.slice(0, 3) === '000';

}


delayResult (ms) {
  var start = new Date().getTime()
  var end = start + ms
  while (start < end){
    start = new Date().getTime()
  }

}




}
