import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pago-mercadopago',
  templateUrl: './pago-mercadopago.component.html',
  styleUrls: ['./pago-mercadopago.component.css']
})
export class PagoMercadopagoComponent implements OnInit, AfterViewInit {

  /*
      URL de la app OneUse en MercadoPago: https://www.mercadopago.com.ar/developers/panel/credentials?id=8165018491705514&code=IdWclSDkYknng0jTradj9kEDgTmvYM9p

      Claves de usuario de prueba 1 (VENDEDOR)
      {
        "id": 727650332,
        "nickname": "TEST9XUGAWGE",
        "password": "qatest3385",
        "site_status": "active",
        "email": "test_user_54742029@testuser.com",
      }

      Claves de usuario de prueba 2 (COMPRADOR)
      {
        "id": 727653514,
        "nickname": "TESTJUFV4LH1",
        "password": "qatest133",
        "site_status": "active",
        "email": "test_user_25971562@testuser.com"
      }

      Claves de usuario de prueba 3 (DESTACADOS)
      {
        "id": 728081527,
        "nickname": "TETE209755",
        "password": "qatest8818",
        "site_status": "active",
        "email": "test_user_68217187@testuser.com"
      }
  
      ---------------- APP MP OneUse PADRE (juanivanheer@gmail.com) -------------------------------
      PUBLIC_KEY = 'APP_USR-a4673aa0-ad58-4543-8cfa-9295400f68dc'
      AUTH_KEY = 'APP_USR-8165018491705514-031214-50f0f1c6dac2a9e4f1abc7369f552828-321594747'

      ---------------- APP MP OneUse-TEST VENDEDOR (test_user_54742029@testuser.com) ------------------
      ************** CON ESTAS CLAVES HAY QUE ARMAR LAS PREFERENCIAS DE VENTAS ************************
      PUBLIC_KEY = 'APP_USR-8f101a04-f6b9-4e48-acd1-b8ee31e63605'
      AUTH_KEY = 'APP_USR-6441853255268027-031218-1cc601aea99e8a140d8107921e2e7cc7-727650332'

  */

  constructor() { }

  ngAfterViewInit() {
    var div = (<HTMLFormElement>document.querySelector('#mp'));
    var card = (<HTMLElement>document.createElement('script'));
    card.setAttribute('type', "text/javascript");
    card.setAttribute('src', "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js");
    card.setAttribute('data-button-label', 'Alquilar');
    card.setAttribute('data-header-color', '#4a70af');
    card.setAttribute("data-elements-color", '#ffffff')
    card.setAttribute('data-preference-id', '727650332-92711ac7-f1ce-4062-a1a1-1acffde286f1');
    div.appendChild(card)
  }

  ngOnInit() {
    console.log("xd")
  }

}