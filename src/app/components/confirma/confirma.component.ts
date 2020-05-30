import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../singleton.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirma',
  templateUrl: './confirma.component.html',
  styleUrls: ['./confirma.component.css']
})
export class ConfirmaComponent implements OnInit {

  constructor(private _router: Router, private singleton: SingletonService) { }

  ngOnInit() {
    if (!this.singleton.verificarToken()) {
      this._router.navigate(['/*']);
    }
  }

}
