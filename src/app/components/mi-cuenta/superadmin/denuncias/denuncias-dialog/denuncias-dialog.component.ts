import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DatosUsuariosDialogComponent } from '../../usuarios/datos-usuarios-dialog/datos-usuarios-dialog.component';

@Component({
  selector: 'app-denuncias-dialog',
  templateUrl: './denuncias-dialog.component.html',
  styleUrls: ['./denuncias-dialog.component.css']
})
export class DenunciasDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DenunciasDialogComponent>, @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  ngOnInit() {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      if(element.tipo_denuncia == "ilegal") element.tipo_denuncia = "El comentario posee venta de artículos ilegales"
      if(element.tipo_denuncia == "violencia") element.tipo_denuncia = "El comentario posee lenguaje que incitan a la violencia"
      if(element.tipo_denuncia == "spam") element.tipo_denuncia = "El comentario no corresponde con la publicación"
      if(element.tipo_denuncia == "desnudos") element.tipo_denuncia = "El comentario posee desnudos o actividad sexual"
      if(element.tipo_denuncia == "acoso") element.tipo_denuncia = "El comentario incita al acoso a otra persona"
      if(element.tipo_denuncia == "no_gusta") element.tipo_denuncia = "El comentario no me gusta"
      if(element.comentario == "" || element.comentario == undefined) element.comentario = "Sin comentarios"
    }
  }

  datosUsuariosDialogRef: MatDialogRef<DatosUsuariosDialogComponent>
  
  openDialogDatosUsuarios(row) {
    this.datosUsuariosDialogRef = this.dialog.open(DatosUsuariosDialogComponent, { data: { data: row.usuario_denunciante } });
  }

  close(){
    this.dialogRef.close();
  }

}
