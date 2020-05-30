import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-propietario-dialog',
  templateUrl: './datos-propietario-dialog.component.html',
  styleUrls: ['./datos-propietario-dialog.component.css']
})
export class DatosPropietarioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DatosPropietarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  propietario = {};

  ngOnInit() {
    this._auth.getPropietarioAlquiler(this.data.alquiler.name_usuarioPropietario).subscribe(
      res => {
        this.propietario = res.usuario;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
