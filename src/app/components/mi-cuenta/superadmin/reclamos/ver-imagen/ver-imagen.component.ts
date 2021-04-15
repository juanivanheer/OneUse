import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-imagen',
  templateUrl: './ver-imagen.component.html',
  styleUrls: ['./ver-imagen.component.css']
})
export class VerImagenComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<VerImagenComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    console.log(this.data.data)
  }

}
