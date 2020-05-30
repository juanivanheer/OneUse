import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriasComponent } from './categorias/categorias.component';

const routes: Routes = [

{path: 'register', component: RegisterComponent},
{path: 'login', component: LoginComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
