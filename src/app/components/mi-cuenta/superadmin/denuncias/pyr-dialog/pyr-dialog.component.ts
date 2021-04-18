import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pyr-dialog',
  templateUrl: './pyr-dialog.component.html',
  styleUrls: ['./pyr-dialog.component.css']
})
export class PyrDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PyrDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  pyr;

  ngOnInit() {
    this.pyr = this.data;
    if (this.pyr.respuesta == undefined){
      this.pyr.respuesta = "Sin cargar"
      this.pyr.updatedAt_formatted = "Sin cargar"
    }
  }

  close() {
    this.dialogRef.close();
  }

}
