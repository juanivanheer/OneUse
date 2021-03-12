import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmacion-destacacion',
  templateUrl: './confirmacion-destacacion.component.html',
  styleUrls: ['./confirmacion-destacacion.component.css']
})
export class ConfirmacionDestacacionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  irHome(){
    window.location.assign("/home")
  }

}
