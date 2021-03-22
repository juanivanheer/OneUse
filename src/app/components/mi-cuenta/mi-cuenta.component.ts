import { Component, OnInit, ViewChild } from "@angular/core";
import { SingletonService } from "../singleton.service";
import { AuthService } from "src/app/services/auth.service";
import { MatSelect } from "@angular/material";

@Component({
  selector: "app-mi-cuenta",
  templateUrl: "./mi-cuenta.component.html",
  styleUrls: ["./mi-cuenta.component.css"],
})
export class MiCuentaComponent implements OnInit {
  alquileres: boolean = false;
  perfil: boolean = false;
  publicaciones = [];
  dataSource;
  hayPublicaciones = false;

  constructor(
    private singleton: SingletonService,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this._auth.get_publicacion(localStorage.getItem("email")).subscribe((res) => {
      this.publicaciones = res.publicaciones;
    });
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  verificarExisitenciaPublicaciones(id, titulo) {
    this._auth.get_visitas_id(id).subscribe((res) => {
      if (res.doc.length < 1) {
        this.hayPublicaciones = false;
        this.dataSource = undefined;
        this.cargarDatos(id, titulo);
      }
    });
  }

  cargarDatos(id, titulo) {
    this._auth.get_visitas_id(id).subscribe((res) => {
      if (res.doc.length > 1) {
        this.hayPublicaciones = true;
        let array = res.doc;
        let arrayObjetos = [];
        for (let i = 0; i < array.length; i++) {
          let objeto = {
            label: array[i].fecha_visita,
            value: array[i].cantidadVisitas,
          };
          arrayObjetos.push(objeto);
        }

        this.dataSource = {
          // Chart Configuration
          chart: {
            caption: "Cantidad de visitas en '" + titulo + "'",
            subCaption: "En un período de tiempo",
            xAxisName: "Tiempo",
            yAxisName: "Cantidad de visitas",
            numberSuffix: " ",
            theme: "fusion",
          },
          data: arrayObjetos,
        };
      } else {
        this.hayPublicaciones = false;
        this.dataSource = undefined;
        alert("No hay datos estadísticos con la publicación seleccionada");
      }
    });
  }

  cambioTab(evento) {
    this.ngOnInit();
  }
}
