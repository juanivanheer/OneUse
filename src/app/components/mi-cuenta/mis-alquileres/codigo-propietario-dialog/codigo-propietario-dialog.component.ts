import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-codigo-propietario-dialog',
  templateUrl: './codigo-propietario-dialog.component.html',
  styleUrls: ['./codigo-propietario-dialog.component.css']
})
export class CodigoPropietarioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CodigoPropietarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  codigoIncorrecto: boolean;

  close() {
    this.dialogRef.close();
  }

  codigoIngresado(codigo) {
    this._auth.registrar_codigoPropietarioEntrega(codigo).subscribe(
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
