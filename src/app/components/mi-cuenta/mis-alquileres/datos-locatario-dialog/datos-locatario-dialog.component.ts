import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-locatario-dialog',
  templateUrl: './datos-locatario-dialog.component.html',
  styleUrls: ['./datos-locatario-dialog.component.css']
})
export class DatosLocatarioDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DatosLocatarioDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  locatario = {
    nombre: '',
    apellido: '',
    codArea: '',
    telefono: '',
    email: ''
  };

  ngOnInit() {
    this._auth.getPropietarioAlquiler(this.data.alquiler.name_usuarioLocatario).subscribe(
      res => {
        this.locatario = res.usuario;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
