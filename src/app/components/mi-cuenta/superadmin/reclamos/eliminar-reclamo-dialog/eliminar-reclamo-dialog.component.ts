import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-eliminar-reclamo-dialog',
  templateUrl: './eliminar-reclamo-dialog.component.html',
  styleUrls: ['./eliminar-reclamo-dialog.component.css']
})
export class EliminarReclamoDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EliminarReclamoDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  reclamo;

  ngOnInit() {
    this.reclamo = this.data.data;
  }

  eliminarReclamo() {
    this._auth.delete_reclamos(this.reclamo._id).subscribe(
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
