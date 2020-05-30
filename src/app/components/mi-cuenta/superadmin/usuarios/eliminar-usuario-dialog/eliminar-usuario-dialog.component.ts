import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eliminar-usuario-dialog',
  templateUrl: './eliminar-usuario-dialog.component.html',
  styleUrls: ['./eliminar-usuario-dialog.component.css']
})
export class EliminarUsuarioDialogComponent implements OnInit {

  usuario;

  constructor(private dialogRef: MatDialogRef<EliminarUsuarioDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.usuario = this.data.data;
  }

  eliminarUsuario() {
    this._auth.delete_user(this.usuario.email).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
