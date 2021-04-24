import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import "rxjs/add/observable/zip";
import { Observable } from 'rxjs/Observable';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-confirmacion-alquiler',
  templateUrl: './confirmacion-alquiler.component.html',
  styleUrls: ['./confirmacion-alquiler.component.css']
})
export class ConfirmacionAlquilerComponent implements AfterViewInit {

  constructor(private _auth: AuthService, private spinner: NgxSpinnerService) { }
  mostrar = false;
  
  ngAfterViewInit() {
    this.spinner.show();
    setTimeout(() => {
      var url = new URL(window.location.href);

      var id_alquiler = url.searchParams.get("id_alquiler");
      var id_publicacion = url.searchParams.get("id_publicacion");
      var monto_alquiler = url.searchParams.get("monto_alquiler");
      var monto_reembolso = url.searchParams.get("monto_reembolso");
      var id_locatario = url.searchParams.get("id_locatario");
      var id_propietario = url.searchParams.get("id_propietario")

      let objeto_mp = {
        payment_id: url.searchParams.get("payment_id"),
        preference_id: url.searchParams.get("preference_id"),
        status: url.searchParams.get("status"),
        payment_type: url.searchParams.get("payment_type")
      }

      var obsA = this._auth.get_alquiler_id(id_alquiler);
      var obsB = this._auth.get_publicacion_id(id_publicacion);
      var obsC = this._auth.user_id(id_locatario);
      var obsD = this._auth.user_id(id_propietario)
      var obsE = this._auth.registrar_EnProcesoEntrega(id_alquiler, objeto_mp);
      const obsvArray = [obsA, obsB, obsC, obsD, obsE];
      const zip = Observable.zip(...obsvArray)
      zip.subscribe(
        res => {
          let alquiler = res[0];
          let publicacion = res[1];
          let usuario_locatario = res[2];
          let usuario_propietario = res[3];

          let objeto = {
            tipo_pago: 'alquiler',
            monto_alquiler: monto_alquiler,
            monto_reembolso: monto_reembolso,
            publicacion: publicacion,
            alquiler: alquiler,
            mercadopago: objeto_mp,
            usuario_locador: usuario_locatario,
            usuario_propietario: usuario_propietario,
            estado: 'En proceso de entrega a propietario'
          }

          this._auth.registrar_pago(objeto).subscribe(
            res => {
              console.log(res);
              this.spinner.hide();
              this.mostrar = true;
            }
          )
        }
      )
    }, 3000);
  }

}
