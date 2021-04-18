import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { DatosUsuariosDialogComponent } from '../usuarios/datos-usuarios-dialog/datos-usuarios-dialog.component';
import { PyrDialogComponent } from './pyr-dialog/pyr-dialog.component';
import { DenunciasDialogComponent } from './denuncias-dialog/denuncias-dialog.component';

export interface Denuncia {
  _id: string,
  tipo: string,
  tipo_denuncia: string,
  comentario: string,
  publicacion: {
    _id: string,
    titulo: string,
    categoria: string,
    subcategoria: string,
    descripcion: string,
    preciodia: number,
    preciosemana: string,
    preciomes: string,
    email: string,
    multiplefile: [],
    tipoAlquiler: string,
    estado: string,
    createdAt: string,
    cantDias: string,
    cantidadDisponible: string
  },
  usuario_denunciante: {
    _id: string,
    email: string,
    name: string,
    password: string,
    tipo: string,
    confirmed: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number,
    apellido: string,
    nombre: string,
    barrio: string,
    calle: string,
    ciudad: string,
    piso: string,
    provincia: string,
    telefono: string,
    removablefile: string,
    codArea: string,
    codigoPostal: string,
    departamento: string,
    fecha_nacimiento: string,
    numero: string,
  },
  pyr: {
    _id: string,
    id_publicacion: string,
    pregunta: string,
    createdAt: string,
    updatedAt: string,
    __v: string,
    respuesta: string,
    tiene_respuesta: boolean,
    usuario_publicacion: string,
    contador_denuncias_pregunta: number,
    mostrarDenuncia: boolean,
    createdAt_formatted: string,
    updatedAt_formatted: string,
    denunciarPregunta: boolean
  },
  createdAt: Date,
  updatedAt: Date,
  __v: number
}

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _auth: AuthService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource();
  displayedColumns = ['tipo_denuncia', 'comentario', 'estado', 'denuncias', 'publicacion', 'usuarios', 'accion'];
  data;
  mostrar: boolean = false;
  hayDenuncias: boolean = false;


  ngOnInit() {
    this._auth.get_all_denuncias().subscribe(
      res => {
        let denuncias = res, denucias_aceptadas = [];
        for (let i = 0; i < denuncias.length; i++) {
          const element = denuncias[i];
          if (element.denuncias.length > 3) {
            if (element.tipo_denuncia == "pregunta") element.tipo_denuncia = "Pregunta";
            if (element.tipo_denuncia == "respuesta") element.tipo_denuncia = "Respuesta";
            if (element.tipo_denuncia == "publicacion") element.tipo_denuncia = "Publicación";
            if (element.mensaje_denunciado == undefined) element.mensaje_denunciado = " - No corresponde - "
            denucias_aceptadas.push(element)
          }
        }
        if (denucias_aceptadas.length > 0) {
          this.hayDenuncias = true;
          const ELEMENT_DATA: Denuncia[] = denucias_aceptadas;
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.mostrar = true;
      }
    )
  }

  datosUsuariosDialogRef: MatDialogRef<DatosUsuariosDialogComponent>
  pyrDialogRef: MatDialogRef<PyrDialogComponent>
  denunciasDialogRef: MatDialogRef<DenunciasDialogComponent>

  openDialogDatosUsuarios(row) {
    this.datosUsuariosDialogRef = this.dialog.open(DatosUsuariosDialogComponent, { data: { data: row.usuario_denunciado } });
  }

  openDialogPyr(row) {
    this.pyrDialogRef = this.dialog.open(PyrDialogComponent, { data: row.pyr });
  }

  openDialogDenuncias(row) {
    this.denunciasDialogRef = this.dialog.open(DenunciasDialogComponent, { data: row.denuncias });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  desestimarDenuncia(row) {
    let objeto;
    var obsB;

    if (row.tipo_denuncia == "Pregunta") {
      objeto = {
        contador_denuncias_pregunta: 0,
        pregunta_inhabilitada: false
      }
      obsB = this._auth.update_pyr(row.pyr._id, objeto)
    }

    if (row.tipo_denuncia == "Respuesta") {
      objeto = {
        contador_denuncias_respuesta: 0,
        respuesta_inhabilitada: false
      }
      obsB = this._auth.update_pyr(row.pyr._id, objeto)
    }

    if (row.tipo_denuncia == "Publicación") {
      objeto = {
        contador_denuncias: 0,
        deshabilitada: false
      }
      obsB = this._auth.update_publicacion(row.publicacion._id, objeto)
    }

    var obsA = this._auth.update_denuncia(row._id, { estado: 'Desestimado', denuncias: [] })
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.mostrar = false;
        this.ngOnInit();
      }
    )
  }

  verificarDenuncia(row) {
    let objeto_pyr;

    if (row.tipo_denuncia == "Pregunta") {
      objeto_pyr = {
        contador_denuncias_pregunta: 4,
        pregunta_inhabilitada: false
      }
    }

    if (row.tipo_denuncia == "Respuesta") {
      objeto_pyr = {
        contador_denuncias_respuesta: 4,
        respuesta_inhabilitada: false
      }
    }

    var obsA = this._auth.update_denuncia(row._id, { estado: 'Verificar denuncia' })
    var obsB = this._auth.update_pyr(row.pyr._id, objeto_pyr)
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.mostrar = false;
        this.ngOnInit();
      }
    )
  }

  habilitarMensaje(row) {
    let objeto_pyr;

    if (row.tipo_denuncia == "Pregunta") {
      objeto_pyr = {
        contador_denuncias_pregunta: 4,
        pregunta_inhabilitada: false
      }
    }

    if (row.tipo_denuncia == "Respuesta") {
      objeto_pyr = {
        contador_denuncias_respuesta: 4,
        respuesta_inhabilitada: false
      }
    }

    var obsA = this._auth.update_denuncia(row._id, { estado: 'Verificar denuncia' })
    var obsB = this._auth.update_pyr(row.pyr._id, objeto_pyr)
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.mostrar = false;
        this.ngOnInit();
      }
    )
  }

  deshabilitarMensaje(row) {
    let objeto_pyr;

    if (row.tipo_denuncia == "Pregunta") {
      objeto_pyr = {
        contador_denuncias_pregunta: 4,
        pregunta_inhabilitada: true
      }
    }

    if (row.tipo_denuncia == "Respuesta") {
      objeto_pyr = {
        contador_denuncias_respuesta: 4,
        respuesta_inhabilitada: true
      }
    }

    var obsA = this._auth.update_denuncia(row._id, { estado: 'Deshabilitado' })
    var obsB = this._auth.update_pyr(row.pyr._id, objeto_pyr)
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.mostrar = false;
        this.ngOnInit();
      }
    )
  }

  habilitarPublicacion(row) {
    var obsA = this._auth.update_denuncia(row._id, { estado: 'Verificar denuncia' })
    var obsB = this._auth.update_publicacion(row.publicacion._id, { deshabilitada: false })
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.mostrar = false;
        this.ngOnInit();
      }
    )
  }

  deshabilitarPublicacion(row) {
    var obsA = this._auth.update_denuncia(row._id, { estado: 'Deshabilitado' })
    var obsB = this._auth.update_publicacion(row.publicacion._id, { deshabilitada: true })
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.mostrar = false;
        this.ngOnInit();
      }
    )
  }

}
