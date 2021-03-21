import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { SingletonService } from '../../singleton.service';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';



@Component({
  selector: 'app-mis-reclamos',
  templateUrl: './mis-reclamos.component.html',
  styleUrls: ['./mis-reclamos.component.css']
})


export class MisReclamosComponent implements OnInit {


  constructor(private _auth: AuthService, private singleton: SingletonService) { }

  private subscription: Subscription;

  mostrar: boolean = false;

  ngOnInit() {
    
    this.subscription = this._auth.get_reclamos_user(localStorage.getItem("email")).subscribe(

    res => {
      this.mostrar = true
      console.log(res.reclamos)

    }
    )   
  }

  
}

