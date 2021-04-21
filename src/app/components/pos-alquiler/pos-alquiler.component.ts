import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/observable/zip";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pos-alquiler',
  templateUrl: './pos-alquiler.component.html',
  styleUrls: ['./pos-alquiler.component.css']
})
export class PosAlquilerComponent implements OnInit {

  constructor(private _auth: AuthService, private http: HttpClient) { }
  tipoAlquiler;
  montoTotal;
  montoFinal;
  id_pago_mp;
  montoUnitario;
  montoUnitarioConCantidad;
  montoReembolso;
  cantidadDias;
  stockSeleccionado;
  step = 0;
  mostrar: boolean = false;

  alquiler;
  publicaciones;
  usuarios;
  usuarioPropietario;
  usuarioLocatario;
  publicacionAlquilada;

  setStep(index: number) {
    this.step = index;
  }

  ngOnInit() {
    var urlActual = window.location.href;
    var id = urlActual.substr(36);

    var obsA = this._auth.get_alquiler_id(id);
    var obsB = this._auth.get_all_publicaciones();
    var obsC = this._auth.get_all_users();
    var obsD = this._auth.user_data(localStorage.getItem("email"));
    const obsvArray = [obsA, obsB, obsC, obsD];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.alquiler = res[0];
        this.publicaciones = res[1].publicaciones;
        this.usuarios = res[2];
        this.usuarioLocatario = res[3];

        // Datos del usuario propietario
        for (let i = 0; i < this.usuarios.length; i++) {
          const element = this.usuarios[i];
          if (element.name == this.alquiler.name_usuarioPropietario) {
            this.usuarioPropietario = element;
          }
        }

        for (let i = 0; i < this.publicaciones.length; i++) {
          const element = this.publicaciones[i];
          if (element._id == this.alquiler.id_publicacion) {
            this.publicacionAlquilada = element;
          }
        }

        this.montoTotal = this.alquiler.montoAlquiler;
        this.montoReembolso = this.alquiler.montoReembolso;
        this.stockSeleccionado = this.alquiler.cantidadAlquilar
        this.cantidadDias = this.alquiler.cantidadDias;

        //Calculos mostrados al usuario
        this.montoUnitario = parseFloat(this.montoTotal) / parseFloat(this.stockSeleccionado)
        this.montoUnitarioConCantidad = this.montoUnitario * this.stockSeleccionado
        this.montoFinal = this.montoUnitarioConCantidad + this.montoReembolso;

        this.mercadopago();
      }
    )
  }


  mercadopago() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer APP_USR-6441853255268027-031218-1cc601aea99e8a140d8107921e2e7cc7-727650332'
      })
    };

    let objeto_conIntervencion = {
      "purpose": "wallet_purchase",
      "items": [
        {
          "title": this.publicacionAlquilada.titulo,
          "description": this.publicacionAlquilada.descripcion,
          "quantity": 1,
          "currency_id": "ARS",
          "unit_price": this.montoFinal
        }
      ],
      "back_urls": {
        "success": "https://localhost:4200/confirmacion-alquiler?id_alquiler=" + this.alquiler._id + "&monto_alquiler=" + this.montoFinal + "&monto_reembolso=" + this.montoReembolso + "&id_locatario=" + this.usuarioLocatario._id + "&id_propietario=" + this.usuarioPropietario._id + "&id_publicacion=" + this.publicacionAlquilada._id,
        "failure": "https://localhost:4200"
      },
      "statement_descriptor": "ONEUSE"
    }

    this.http.post<any>('https://api.mercadopago.com/checkout/preferences', objeto_conIntervencion, httpOptions).subscribe(
      res => {
        this.id_pago_mp = res.id;
      },
      err => {
        console.log("ERROR: ", err)
      }
    )

    this.mostrar = true;

    setTimeout(() => {
      var div = (<HTMLFormElement>document.querySelector('#mp'));
      var card = (<HTMLElement>document.createElement('script'));
      card.setAttribute('type', "text/javascript");
      card.setAttribute('src', "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js");
      card.setAttribute('data-button-label', 'Continuar con el pago');
      card.setAttribute('data-preference-id', this.id_pago_mp);
      div.appendChild(card)
    }, 5000);
  }
}

