import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-codigo-devolucion-locatario-dialog',
  templateUrl: './codigo-devolucion-locatario-dialog.component.html',
  styleUrls: ['./codigo-devolucion-locatario-dialog.component.css']
})
export class CodigoDevolucionLocatarioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CodigoDevolucionLocatarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  codigoIncorrecto: boolean;

  codigoIngresado(codigo) {
    this._auth.registrar_codigoPropietarioDevolucion(codigo).subscribe(
      res => {
        if (res.alquiler == null) {
          this.codigoIncorrecto = true;
        } else {
          this.codigoIncorrecto = false;
          this.dialogRef.close();
          window.location.reload()
        }

      },
      err => {

      }
    )
  }

}
