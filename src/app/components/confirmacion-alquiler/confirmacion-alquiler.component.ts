import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmacion-alquiler',
  templateUrl: './confirmacion-alquiler.component.html',
  styleUrls: ['./confirmacion-alquiler.component.css']
})
export class ConfirmacionAlquilerComponent implements OnInit, AfterViewInit {

  constructor(private _auth: AuthService) { }

  id_alquiler;

  ngOnInit() {
    this.id_alquiler = String(window.location.href).slice(45, 69);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let url = new URL(window.location.href);
      let objeto = {
        payment_id: url.searchParams.get("payment_id"),
        preference_id: url.searchParams.get("preference_id"),
        status: url.searchParams.get("status"),
        payment_type: url.searchParams.get("payment_type")
      }

      this._auth.registrar_EnProcesoEntrega(this.id_alquiler, objeto).subscribe(
        res => {
          //console.log(res);
        }
      )
    }, 3000);
  }

}
