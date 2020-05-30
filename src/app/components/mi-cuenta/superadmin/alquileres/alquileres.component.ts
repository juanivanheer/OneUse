import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { DatosAlquileresDialogComponent } from './datos-alquileres-dialog/datos-alquileres-dialog.component'
import { EliminarAlquilerSuperadminDialogComponent } from './eliminar-alquiler-dialog/eliminar-alquiler-dialog.component'
import { ModificarAlquilerDialogComponent } from './modificar-alquiler-dialog/modificar-alquiler-dialog.component'

export interface Alquileres {
  _id: string,
  imagen: string,
  fuePagado: string,
  estado: string,
  id_publicacion: string,
  name_usuarioPropietario: string,
  name_usuarioLocatario: string,
  cantidadDias: string,
  cantidadAlquilar: string,
  createdAt: string,
  updatedAt: string,
  __v: string,
  codigoEntregaLocatario: string,
  codigoEntregaPropietario: string,
  codigoLocatarioIngresado: string,
  codigoPropietarioIngresado: string,
  fechaCaducidadEntrega: string,
  codigoDevolucionLocatario: string,
  codigoDevolucionPropietario: string,
  codigoLocatarioDevolucionIngresado: string,
  codigoPropietarioDevolucionIngresado: string,
  fechaCaducidadDevolucion: string,
  fechaEntrega: string,
  fechaDevolucion: string
}

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _auth: AuthService, public dialog: MatDialog) { }

  private subscription: Subscription;

  datosAlquilerDialogRef: MatDialogRef<DatosAlquileresDialogComponent>
  eliminarAlquilerDialogRef: MatDialogRef<EliminarAlquilerSuperadminDialogComponent>
  modificarAlquilerDialogRef: MatDialogRef<ModificarAlquilerDialogComponent>

  dataSource;
  displayedColumns = ['name_usuarioPropietario', 'name_usuarioLocatario', 'estado', 'boton'];
  data;

  ngOnInit() {
    this.subscription = this._auth.get_all_alquileres().subscribe(
      res => {
        const ELEMENT_DATA: Alquileres[] = res;
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

  openDialogDatosAlquiler(data): void {
    this.datosAlquilerDialogRef = this.dialog.open(DatosAlquileresDialogComponent,
      {
        data: {
          data: data
        }
      });
  }

  openDialogEliminarAlquiler(data): void {
    this.eliminarAlquilerDialogRef = this.dialog.open(EliminarAlquilerSuperadminDialogComponent,
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

  openDialogModificarAlquiler(data): void {
    this.modificarAlquilerDialogRef = this.dialog.open(ModificarAlquilerDialogComponent,
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

}
