import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-publicaciones-dialog',
  templateUrl: './dehsabilitar-dialog.html',
  styleUrls: ['./dehsabilitar-dialog.css']
})
export class DeshabilitarDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeshabilitarDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  deshabilitarPublicacion() {
    this.data.publicacion.estado = 'INACTIVA';

    this._auth.update_publicacion(this.data.publicacion._id, this.data.publicacion).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }


}
