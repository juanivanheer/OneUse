import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SingletonService } from '../../singleton.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { ReclamoDialogComponent } from './reclamo-dialog/reclamo-dialog.component';


export interface Reclamos {
  updatedAt: string
  createdAt: string,
  motivo: string,
  tipo: string,
  id_publicacion: string,
  __v: string,
  estado_reclamo: string,
  usuario_reclamo: string,
  _id: string
}


@Component({
  selector: 'app-mis-reclamos',
  templateUrl: './mis-reclamos.component.html',
  styleUrls: ['./mis-reclamos.component.css']
})


export class MisReclamosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  reclamoDialogRef: MatDialogRef<ReclamoDialogComponent>

  constructor(private _auth: AuthService, public dialog: MatDialog, private singleton: SingletonService) { }

  dataSource = new MatTableDataSource();
  displayedColumns = ['id_publicacion', 'titulo', 'tipo', 'estado_reclamo'];
  data;
  hayReclamos: boolean = false;
  mostrar: boolean = false;

  ngOnInit() {
    this._auth.get_reclamos_user(localStorage.getItem("email")).subscribe(
      res => {
        if (res.reclamos.length > 0) {
          this.hayReclamos = true;
          console.log(res.reclamos)
          const ELEMENT_DATA: Reclamos[] = res.reclamos;
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        this.mostrar = true;
      },
      err => {
        this.mostrar = true;
      }
    )
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  openDialogDatosAlquiler(data): void {
    this.reclamoDialogRef = this.dialog.open(ReclamoDialogComponent,
      {
        data: {
          data: data
        }
      });
  }
}

