import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _auth: AuthService, public dialog: MatDialog,) { }

  dataSource = new MatTableDataSource();
  mostrar: boolean = false;
  displayedColumns = ['name_usuarioPropietario', 'name_usuarioLocatario', 'estado', 'boton'];
  data;

  ngOnInit() {
  }

}
