import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-destacacion-publicacion',
  templateUrl: './destacacion-publicacion.component.html',
  styleUrls: ['./destacacion-publicacion.component.css']
})
export class DestacacionPublicacionComponent implements OnInit {

  destacacion:Boolean=false;
  titulo:String;
  precio:Number;
  descripcion:String;

  constructor() { }

  ngOnInit() {
  }

  openMercadoPago(){
    this.destacacion = true;
  }
  mostrarDatosPlatinium(){
    this.titulo = "PLATINIUM";
    this.precio = 200;
    this.descripcion ="Tu producto aparecerá destacado una semana";
  }
  mostrarDatosGold(){
    this.titulo = "GOLD";
    this.precio = 300;
    this.descripcion ="Tu producto aparecerá destacado un mes";
  }
}
