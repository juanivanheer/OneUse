import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-pos-alquiler',
  templateUrl: './pos-alquiler.component.html',
  styleUrls: ['./pos-alquiler.component.css']
})
export class PosAlquilerComponent implements OnInit {

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
  tipoAlquiler;
  montoTotal;
  id_pago_mp;
  id_alquiler;
  montoUnitario;
  montoReembolso;
  step = 0;
  mostrar: boolean = false;

  setStep(index: number) {
    this.step = index;
  }

  ngOnInit() {
    var urlActual = window.location.href;
    var id = urlActual.substr(36);

    this._auth.get_publicacion_id(id).subscribe(
      res => {
        this.publicacion = res;

        this.titulo = res.titulo;
        this.preciodia = res.preciodia;
        this.preciomes = res.preciomes;
        this.preciosemana = res.preciosemana;
        this.descripcion = res.descripcion;
        this.tipoAlquiler = res.tipoAlquiler;

        this._auth.user_data(this.publicacion.email).subscribe(
          res2 => {
            this.nombre = res2.nombre;
            this.email = res2.email;
            this.telefono = res2.telefono;
            this.apellido = res2.apellido;
            this.codArea = res2.codArea;
          }
        );

        this._auth.get_all_alquileres().subscribe(
          res => {
            let alquileres = res;
            for (let i = 0; i < alquileres.length; i++) {
              const element = alquileres[i];
              if (element.id_publicacion == id && element.estado == "En proceso de pago") {
                this.id_alquiler = element._id;
                this.montoTotal = element.montoAlquiler;
                this.montoReembolso = element.montoReembolso;
                this.cantidadSeleccionada = element.cantidadAlquilar
                this.montoUnitario = parseFloat(this.montoTotal) / parseFloat(this.cantidadSeleccionada)
                this.mercadopago();
                break;
              }
            }
          }
        )
      },
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
        "items": [
          {
            "title": this.titulo,
            "description": this.descripcion,
            "quantity": this.cantidadSeleccionada,
            "currency_id": "ARS",
            "unit_price": this.montoUnitario
          },
          {
            "title": "Reembolso del objeto",
            "description": "Se toma el 40% del monto total del alquiler como parte del reembolso. Este monto será devuelto una vez que se devuelva el objeto y se compruebe que no haya sido dañado",
            "quantity": 1,
            "currency_id": "ARS",
            "unit_price": parseInt(this.montoReembolso)
          }
        ],
        "back_urls": {
          "success": "https://localhost:4200/confirmacion-alquiler/" + this.id_alquiler,
          "failure": "https://localhost:4200"
        },
        "statement_descriptor": "OneUse"
      }

      let objeto_sinIntervencion = {
        "items": [
          {
            "title": this.titulo,
            "description": this.descripcion,
            "quantity": this.cantidadSeleccionada,
            "currency_id": "ARS",
            "unit_price": this.montoUnitario
          },
        ],
        "back_urls": {
          "success": "https://localhost:4200/confirmacion-alquiler/" + this.id_alquiler,
          "failure": "https://localhost:4200"
        },
        "statement_descriptor": "OneUse"
      }

      if (this.tipoAlquiler == "AlquilerConIntervencion") {
        this.http.post<any>('https://api.mercadopago.com/checkout/preferences', objeto_conIntervencion, httpOptions).subscribe(
          res => {
            this.id_pago_mp = res.id;
          },
          err => {
            console.log("ERROR: ", err)
          }
        )
      } else {
        this.http.post<any>('https://api.mercadopago.com/checkout/preferences', objeto_sinIntervencion, httpOptions).subscribe(
          res => {
            this.id_pago_mp = res.id;
          },
          err => {
            console.log("ERROR: ", err)
          }
        )
      }
      
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

