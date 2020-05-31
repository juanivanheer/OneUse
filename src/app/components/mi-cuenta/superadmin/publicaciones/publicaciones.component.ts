import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { DatosPublicacionesDialogComponent } from './datos-publicaciones-dialog/datos-publicaciones-dialog.component'
import { EliminarPublicacionDialogComponent } from './eliminar-publicacion-dialog/eliminar-publicacion-dialog.component'
import { ModificarPublicacionDialogComponent } from './modificar-publicacion-dialog/modificar-publicacion-dialog.component'

export interface Publicaciones {
  _id: string,
  titulo: string,
  categoria: string,
  subcategoria: string,
  descripcion: string,
  preciodia: string,
  preciosemana: string,
  preciomes: string,
  email: string,
  multiplefile: string,
  tipoAlquiler: string,
  destacar: string,
  estado: string,
  createdAt: string,
  updatedAt: string,
  __v: string,
  cantDias: string,
  cantidadDisponible: string,
  contadorDeVisita: string
}

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})


export class PublicacionesComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _auth: AuthService, public dialog: MatDialog, private singleton: SingletonService) { }

  private subscription: Subscription;

  datosPublicacionDialogRef: MatDialogRef<DatosPublicacionesDialogComponent>
  eliminarPublicacionDialogRef: MatDialogRef<EliminarPublicacionDialogComponent>
  modificarPublicacionDialogRef: MatDialogRef<ModificarPublicacionDialogComponent>

  dataSource;
  displayedColumns = ['titulo', 'categoria', 'destacar', 'estado', 'boton'];
  data;

  ngOnInit() {
    this.subscription = this._auth.get_all_publicaciones().subscribe(
      res => {
        const ELEMENT_DATA: Publicaciones[] = res.publicaciones;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialogDatosPublicacion(data): void {
    this.datosPublicacionDialogRef = this.dialog.open(DatosPublicacionesDialogComponent,
      {
        data: {
          data: data
        }
      });
  }

  openDialogEliminarPublicacion(data): void {
    this.eliminarPublicacionDialogRef = this.dialog.open(EliminarPublicacionDialogComponent,
      {
        data: {
          data: data
        }
      });

    this.dialog.afterAllClosed.subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  openDialogModificarPublicacion(data): void {
    this.modificarPublicacionDialogRef = this.dialog.open(ModificarPublicacionDialogComponent,
      {
        data: {
          data: data
        }
      });

    this.dialog.afterAllClosed.subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  redireccionar(row) {
    let url = 'http://localhost:4200/publicaciones/' + row._id;
    window.open(url, '_blank');
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }


}
