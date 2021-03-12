import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destacacion-publicacion',
  templateUrl: './destacacion-publicacion.component.html',
  styleUrls: ['./destacacion-publicacion.component.css']
})
export class DestacacionPublicacionComponent implements OnInit {

  destacacion: Boolean = false;
  titulo: String;
  precio: Number;
  descripcion: String;
  seleccion: string;
  id_pago;
  cantidad = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  mostrarDatosPlatinium() {
    this.titulo = "PLATINIUM";
    this.precio = 2000;
    this.descripcion = "Tu producto aparecerá destacado una semana";
    this.mercadopago('platinum');
  }

  mostrarDatosGold() {
    this.titulo = "GOLD";
    this.precio = 2800;
    this.descripcion = "Tu producto aparecerá destacado un mes";
    this.mercadopago('gold');
  }

  mercadopago(tipo) {
    this.destacacion = true;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer APP_USR-6441853255268027-031218-1cc601aea99e8a140d8107921e2e7cc7-727650332'
      })
    };

    let platinum = {
      "items": [
        {
          "title": "Destacación PLATINUM",
          "description": "Con tu cuenta PLATINIUM podrás tener tu publicación una semana destacada, lo que permitirá que aparezca en las primeras posiciones en las búsquedas",
          "quantity": 1,
          "currency_id": "ARS",
          "unit_price": 2000.0
        }
      ],
      "back_urls": {
        "success": "https://localhost:4200/confirmacion-destacacion",
        "failure": "https://localhost:4200"
      },
      "statement_descriptor": "OneUse"
    }

    let gold = {
      "items": [
        {
          "title": "Destacación GOLD",
          "description": "Con tu cuenta GOLD podrás tener tu publicación una mes destacada, lo que permitirá que aparezca en las primeras posiciones en las búsquedas",
          "quantity": 1,
          "currency_id": "ARS",
          "unit_price": 2800.0
        }
      ],
      "back_urls": {
        "success": "https://localhost:4200/confirmacion-destacacion",
        "failure": "https://localhost:4200"
      },
      "statement_descriptor": "OneUse"
    }

    if (tipo == 'platinum') {
      this.http.post<any>('https://api.mercadopago.com/checkout/preferences', platinum, httpOptions).subscribe(
        res => {
          //console.log("PLATINUM OK: ", res);
          this.id_pago = res.id;
        },
        err => {
          console.log("ERROR: ", err)
        }
      )
    } else {
      this.http.post<any>('https://api.mercadopago.com/checkout/preferences', gold, httpOptions).subscribe(
        res => {
          //console.log("GOLD OK: ", res);
          this.id_pago = res.id;
        },
        err => {
          console.log("ERROR: ", err)
        }
      )
    }

    setTimeout(() => {
      if (this.cantidad == 0) {
        var div = (<HTMLFormElement>document.querySelector('#mp' + this.cantidad));
        var card = (<HTMLElement>document.createElement('script'));
        card.setAttribute('type', "text/javascript");
        card.setAttribute('src', "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js");
        card.setAttribute('data-button-label', 'Destacar ' + tipo);
        card.setAttribute('data-preference-id', this.id_pago);
        div.appendChild(card)
        this.cantidad++;
      } else {
        var div_anterior = (<HTMLFormElement>document.querySelector('#mp' + (this.cantidad - 1)));
        div_anterior.remove();
        var card_anterior = (<HTMLElement>document.createElement('script'));
        card_anterior.remove();

        var ultimo = (<HTMLFormElement>document.querySelector('#ultimo'));
        var mp_nuevo = (<HTMLElement>document.createElement('div'));
        mp_nuevo.setAttribute("id", "mp" + this.cantidad);
        ultimo.appendChild(mp_nuevo);
        var div = (<HTMLFormElement>document.querySelector('#mp' + this.cantidad));
        var card = (<HTMLElement>document.createElement('script'));
        card.setAttribute('type', "text/javascript");
        card.setAttribute('src', "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js");
        card.setAttribute('data-button-label', 'Destacar ' + tipo);
        card.setAttribute('data-preference-id', this.id_pago);
        div.appendChild(card)
        this.cantidad++;

      }

    }, 2000);
  }

}
