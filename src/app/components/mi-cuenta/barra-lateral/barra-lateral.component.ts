import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

}
