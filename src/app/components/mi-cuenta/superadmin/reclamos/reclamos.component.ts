import { Component, OnInit, ViewChild } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { EliminarReclamoDialogComponent } from './eliminar-reclamo-dialog/eliminar-reclamo-dialog.component'
import { RespuestaReclamoDialogComponent } from './respuesta-reclamo-dialog/respuesta-reclamo-dialog.component';
import { VerImagenComponent } from './ver-imagen/ver-imagen.component';

export interface Reclamos {
  updatedAt: string
  createdAt: string,
  motivo: string,
  tipo: string,
  __v: string,
  usuario_reclamo: string,
  _id: string
}

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})

export class ReclamosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private singleton: SingletonService, public dialog: MatDialog, private _auth: AuthService,) { }

  eliminarReclamoDialogRef: MatDialogRef<EliminarReclamoDialogComponent>
  respuestaReclamoDialogRef: MatDialogRef<RespuestaReclamoDialogComponent>
  verImagenDialogRef: MatDialogRef<VerImagenComponent>

  dataSource = new MatTableDataSource();
  displayedColumns = ['estado_reclamo', 'tipo', 'usuario_reclamo', 'ver_img', 'boton'];
  data;
  mostrar: boolean = false;

  ngOnInit() {
    this._auth.get_all_reclamos().subscribe(
      res => {
        const ELEMENT_DATA: Reclamos[] = res.reclamos;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.mostrar = true;
      }
    )
  }

  openDialogEliminarReclamo(data): void {
    this.eliminarReclamoDialogRef = this.dialog.open(EliminarReclamoDialogComponent,
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  openDialogRespuestaReclamo(data): void {
    this.respuestaReclamoDialogRef = this.dialog.open(RespuestaReclamoDialogComponent,
      {
        data: {
          data: data
        }
      });
  }

  openDialogVerImagen(data): void {
    this.verImagenDialogRef = this.dialog.open(VerImagenComponent,
      {
        data: data

      });
  }

}
