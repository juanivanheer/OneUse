import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../../../singleton.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmalostpassword',
  templateUrl: './confirmalostpassword.component.html',
  styleUrls: ['./confirmalostpassword.component.css']
})
export class ConfirmaLostPasswordComponent implements OnInit {

  constructor(private _router: Router, private singleton: SingletonService) { }

  ngOnInit() {
    // if (!this.singleton.verificarToken()) {
    //   this._router.navigate(['/*']);
    // }
  }

}
