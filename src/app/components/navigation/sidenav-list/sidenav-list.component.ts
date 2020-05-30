import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SingletonService } from '../../singleton.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  onClose() { this.closeSidenav.emit(); }

  @Output() cambiarEstado = new EventEmitter<string>();
  onClick(url) { this.cambiarEstado.emit(url) }


  buscador(url) {
    this.onClick(url);
  }

  usuarioActivo;

  estadoSesion: boolean;

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
    this.usuarioActivo = localStorage.getItem("email");

    if (this.usuarioActivo == null) {
      this.singleton.setInicioSesion(false);
    } else this.singleton.setInicioSesion(true);

    this.estadoSesion = this.singleton.getInicioSesion();
  }

}
