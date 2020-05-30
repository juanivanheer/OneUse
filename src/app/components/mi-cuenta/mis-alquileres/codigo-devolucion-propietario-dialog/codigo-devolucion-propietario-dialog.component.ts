import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-codigo-devolucion-propietario-dialog',
  templateUrl: './codigo-devolucion-propietario-dialog.component.html',
  styleUrls: ['./codigo-devolucion-propietario-dialog.component.css']
})
export class CodigoDevolucionPropietarioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CodigoDevolucionPropietarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  codigoIncorrecto: boolean;

  close() {
    this.dialogRef.close();
  }

  codigoIngresado(codigo) {
    this._auth.registrar_codigoLocatarioDevolucion(codigo).subscribe(
      res => {
        console.log(res);
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
