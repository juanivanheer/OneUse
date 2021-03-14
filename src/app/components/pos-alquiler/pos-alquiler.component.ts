import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-pos-alquiler',
  templateUrl: './pos-alquiler.component.html',
  styleUrls: ['./pos-alquiler.component.css']
})
export class PosAlquilerComponent implements OnInit, AfterViewInit {

  constructor(private _auth: AuthService, private http: HttpClient) { }
  titulo;
  preciodia;
  preciomes;
  preciosemana;
  descripcion;
  publicacion;
  JSON;
  JSONfinal;
  arrayJSON = [];
  nombre;
  email;
  telefono;
  apellido;
  codArea;
  cantidad;
  cantidadSeleccionada;
  montoTotal;
  id_pago_mp;
  id_alquiler;

  ngOnInit() {
    var urlActual = window.location.href;
    var id = urlActual.substr(36);

    this._auth.get_publicacion_id(id).subscribe(
      err => {
        this.publicacion = err.publicaciones;

        this.titulo = err.publicaciones.titulo;
        this.preciodia = err.publicaciones.preciodia;
        this.preciomes = err.publicaciones.preciomes;
        this.preciosemana = err.publicaciones.preciosemana;
        this.descripcion = err.publicaciones.descripcion;
        this.cantidad = err.publicaciones.cantidadAlquilar;
        this.montoTotal = err.publicaciones.montoTotal;

        this._auth.user_data(this.publicacion.email).subscribe(
          res => {
            this.nombre = res.nombre;
            this.email = res.email;
            this.telefono = res.telefono;
            this.apellido = res.apellido;
            this.codArea = res.codArea;
          },
          err => { }
        );

        this._auth.get_all_alquileres().subscribe(
          res => {
            let alquileres = res;
            for (let i = 0; i < alquileres.length; i++) {
              const element = alquileres[i];
              if (element.id_publicacion == id) {
                let fecha = new Date(element.createdAt)
                let hoy = new Date();
                if (fecha.getDay() == hoy.getDay() && fecha.getFullYear() == hoy.getFullYear() && fecha.getMonth() == hoy.getMonth()) {
                  this.id_alquiler = element._id;
                  this.montoTotal = element.montoTotal;
                  this.cantidadSeleccionada = element.cantidadAlquilar
                  console.log(this.montoTotal)
                }
              }
            }
          }
        )
      },
      res => {
      })
  }


  ngAfterViewInit() {
    setTimeout(() => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer APP_USR-6441853255268027-031218-1cc601aea99e8a140d8107921e2e7cc7-727650332'
        })
      };

      let objeto = {
        "items": [
          {
            "title": this.titulo,
            "description": this.descripcion,
            "quantity": this.cantidadSeleccionada,
            "currency_id": "ARS",
            "unit_price": parseFloat(this.montoTotal)
          }
        ],
        "back_urls": {
          "success": "https://localhost:4200/confirmacion-alquiler/" + this.id_alquiler,
          "failure": "https://localhost:4200"
        },
        "statement_descriptor": "OneUse"
      }

      this.http.post<any>('https://api.mercadopago.com/checkout/preferences', objeto, httpOptions).subscribe(
        res => {
          this.id_pago_mp = res.id;
        },
        err => {
          console.log("ERROR: ", err)
        }
      )
      setTimeout(() => {
        var div = (<HTMLFormElement>document.querySelector('#mp'));
        var card = (<HTMLElement>document.createElement('script'));
        card.setAttribute('type', "text/javascript");
        card.setAttribute('src', "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js");
        card.setAttribute('data-button-label', 'Continuar con el pago');
        console.log(this.id_pago_mp)
        card.setAttribute('data-preference-id', this.id_pago_mp);
        div.appendChild(card)
      }, 1000);
    }, 1500);

  }
}

