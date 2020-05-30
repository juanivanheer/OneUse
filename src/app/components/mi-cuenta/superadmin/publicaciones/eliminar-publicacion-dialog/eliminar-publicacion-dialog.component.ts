import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eliminar-publicacion-dialog',
  templateUrl: './eliminar-publicacion-dialog.component.html',
  styleUrls: ['./eliminar-publicacion-dialog.component.css']
})
export class EliminarPublicacionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EliminarPublicacionDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  publicacion;

  ngOnInit() {
    this.publicacion = this.data.data;
  }

  eliminarPublicacion() {
    this._auth.delete_publicacion(this.publicacion._id).subscribe(
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
