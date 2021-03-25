import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SingletonService } from 'src/app/components/singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { EliminarReclamoDialogComponent } from './eliminar-reclamo-dialog/eliminar-reclamo-dialog.component'
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';

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

  constructor(private singleton: SingletonService,public dialog: MatDialog, private _auth: AuthService,) { }
  
  private subscription: Subscription;

  eliminarReclamoDialogRef: MatDialogRef<EliminarReclamoDialogComponent>
  
  dataSource;
  displayedColumns = ['_id', 'motivo', 'usuario_reclamo', 'boton' ];
  data;

  ngOnInit() {
    this.subscription = this._auth.get_all_reclamos().subscribe(
      res => {
        console.log(res.reclamos)
        const ELEMENT_DATA: Reclamos[] = res.reclamos;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

}
