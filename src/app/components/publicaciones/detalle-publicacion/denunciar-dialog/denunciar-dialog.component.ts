import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-denunciar-dialog',
  templateUrl: './denunciar-dialog.component.html',
  styleUrls: ['./denunciar-dialog.component.css']
})
export class DenunciarDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DenunciarDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    
  }

  close(){
    this.dialogRef.close();
  }

}
