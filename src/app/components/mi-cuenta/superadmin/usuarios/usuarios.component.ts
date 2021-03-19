import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { DatosUsuariosDialogComponent } from './datos-usuarios-dialog/datos-usuarios-dialog.component'
import { EliminarUsuarioDialogComponent } from './eliminar-usuario-dialog/eliminar-usuario-dialog.component'
import { ModificarUsuarioDialogComponent } from './modificar-usuario-dialog/modificar-usuario-dialog.component'

export interface Usuarios {
  _id: string,
  name: string,
  email: string,
  password: string,
  confirmed: string,
  createdAt: string,
  updatedAt: string,
  __v: string,
  apellido: string,
  ciudad: string,
  fecha_nacimiento: string,
  nombre: string,
  provincia: string,
  telefono: string,
  removablefile: string,
  calle: string,
  codigoPostal: string,
  departamento: string,
  numero: string,
  piso: string,
  barrio: string,
  codArea: string
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private singleton: SingletonService, private _auth: AuthService, public dialog: MatDialog) { }

  private subscription: Subscription;
  datosUsuariosDialogRef: MatDialogRef<DatosUsuariosDialogComponent>
  eliminarUsuarioDialogRef: MatDialogRef<EliminarUsuarioDialogComponent>
  modificarUsuarioDialogRef: MatDialogRef<ModificarUsuarioDialogComponent>

  nombreUsuario;
  mail;
  fechaCreacion;
  dataSource = new MatTableDataSource();
  displayedColumns = ['nombre', 'email', 'fecha', 'boton'];
  data;
  mostrar: boolean = false;

  ngOnInit() {
    this.subscription = this._auth.get_all_users().subscribe(
      res => {
        if (res != undefined && res != null) {
          const ELEMENT_DATA: Usuarios[] = res;
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.mostrar = true;
        }
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialogUsuarios(data): void {
    this.datosUsuariosDialogRef = this.dialog.open(DatosUsuariosDialogComponent,
      {
        data: {
          data: data
        }
      });
  }

  openDialogEliminarUsuario(data): void {
    this.eliminarUsuarioDialogRef = this.dialog.open(EliminarUsuarioDialogComponent,
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

  openDialogModificarUsuario(data): void {
    this.modificarUsuarioDialogRef = this.dialog.open(ModificarUsuarioDialogComponent,
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

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

}
