import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eliminar-alquiler-dialog',
  templateUrl: './eliminar-alquiler-dialog.component.html',
  styleUrls: ['./eliminar-alquiler-dialog.component.css']
})
export class EliminarAlquilerSuperadminDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EliminarAlquilerSuperadminDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  alquiler;

  ngOnInit() {
    this.alquiler = this.data.data;
  }

  eliminarAlquiler() {
    this._auth.delete_alquiler(this.alquiler._id).subscribe(
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
