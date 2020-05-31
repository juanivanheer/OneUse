import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-codigo-locatario-dialog',
  templateUrl: './codigo-locatario-dialog.component.html',
  styleUrls: ['./codigo-locatario-dialog.component.css']
})
export class CodigoLocatarioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CodigoLocatarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  codigoIncorrecto: boolean;

  codigoIngresado(codigo) {
    this._auth.registrar_codigoLocatarioEntrega(codigo).subscribe(
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

  close() {
    this.dialogRef.close();
  }

}
