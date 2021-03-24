import { MisReclamosComponent } from './components/mi-cuenta/mis-reclamos/mis-reclamos.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { PerfilUsuarioComponent } from './components/mi-cuenta/perfil-usuario/perfil-usuario.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ConfirmacionEmailComponent } from './components/confirmacionemail/confirmacionemail.component';
import { ConfirmaComponent } from './components/confirma/confirma.component';
import { RegisterPublicacionComponent } from './components/register-publicacion/register-publicacion.component';
import { PublicacionExitoComponent } from './components/publicacion-exito/publicacion-exito.component';
import { DestacacionPublicacionComponent } from './components/destacacion-publicacion/destacacion-publicacion.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MisPublicacionesComponent } from './components//mi-cuenta/mis-publicaciones/mis-publicaciones.component';
import { MisAlquileresComponent } from './components//mi-cuenta/mis-alquileres/mis-alquileres.component';
import { ConfirmacionDestacacionComponent } from './components/confirmacion-destacacion/confirmacion-destacacion.component';
import { DetallePublicacionComponent } from './components/publicaciones/detalle-publicacion/detalle-publicacion.component';
import { EditarPublicacionComponent } from './components/publicaciones/editar-publicacion/editar-publicacion.component';
import { BusquedaCategoriasComponent } from './components/busqueda/busqueda-categorias/busqueda-categorias.component';
import { BusquedaPublicacionesComponent } from './components/busqueda/busqueda-publicaciones/busqueda-publicaciones.component';
import { LostPasswordComponent } from './components/login/lostpassword/lostpassword.component';
import { ConfirmaLostPasswordComponent } from './components/login/lostpassword/confirmalostpassword/confirmalostpassword.component';
import { PosAlquilerComponent } from './components/pos-alquiler/pos-alquiler.component';
import { ConfirmacionAlquilerComponent } from './components/confirmacion-alquiler/confirmacion-alquiler.component';
import { NotificacionesComponent } from './components/mi-cuenta/notificaciones/notificaciones.component';
import { NewpwdComponent } from './components/newpwd/newpwd.component';
import { CancelarAlquilerComponent } from './components/cancelar-alquiler/cancelar-alquiler.component';
import { ReclamarAlquilerComponent } from './components/reclamar-alquiler/reclamar-alquiler.component';
import { PrereclamoComponent } from './components/prereclamo/prereclamo.component';
import { ReclamoExitoComponent } from './components/reclamo-exito/reclamo-exito.component';
import { SuperadminComponent } from './components//mi-cuenta/superadmin/superadmin.component';
import { AlquileresComponent } from './components//mi-cuenta/superadmin/alquileres/alquileres.component';
import { PublicacionesComponent } from './components//mi-cuenta/superadmin/publicaciones/publicaciones.component';
import { ReclamosComponent } from './components//mi-cuenta/superadmin/reclamos/reclamos.component';
import { UsuariosComponent } from './components//mi-cuenta/superadmin/usuarios/usuarios.component';
import { EstadisticasComponent } from './components//mi-cuenta/superadmin/estadisticas/estadisticas.component';
import { PagoMercadopagoComponent } from './components/pago-mercadopago/pago-mercadopago.component'
import { UsersComponent } from './components/users/users.component'

const appRoutes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lostpassword', component: LostPasswordComponent },
    { path: 'confirmalostpassword', component: ConfirmaLostPasswordComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'newpwd/:token', component: NewpwdComponent },
    /* { path: 'auth', loadChildren: './components/auth.module#AuthModule' }, */
    { path: 'categorias', component: CategoriasComponent },
    { path: 'confirmacionemail/:token', component: ConfirmacionEmailComponent },
    { path: 'cancelar-alquiler', component: CancelarAlquilerComponent },
    { path: 'reclamar-alquiler', component: ReclamarAlquilerComponent },
    { path: 'confirma', component: ConfirmaComponent },
    { path: 'register-publicacion', component: RegisterPublicacionComponent },
    { path: 'publicacion-exito', component: PublicacionExitoComponent },
    { path: 'destacacion-publicacion/:id', component: DestacacionPublicacionComponent },
    { path: 'mi-cuenta', component: MiCuentaComponent, },
    { path: 'mi-cuenta/perfil', component: PerfilUsuarioComponent },
    { path: 'mi-cuenta/mis-alquileres', component: MisAlquileresComponent },
    { path: 'mi-cuenta/mis-publicaciones', component: MisPublicacionesComponent },
    { path: 'mi-cuenta/mis-reclamos', component: MisReclamosComponent },
    { path: 'mi-cuenta/notificaciones', component: NotificacionesComponent },
    { path: 'confirmacion-destacacion/:id', component: ConfirmacionDestacacionComponent },
    { path: 'publicaciones/:id', component: DetallePublicacionComponent },
    { path: 'editar-publicacion/:id', component: EditarPublicacionComponent },
    { path: 'busqueda/c/:c', component: BusquedaCategoriasComponent },
    { path: 'busqueda/p/:p', component: BusquedaPublicacionesComponent },
    { path: 'pos-alquiler/:id', component: PosAlquilerComponent },
    { path: 'prereclamo', component: PrereclamoComponent },
    { path: 'confirmacion-alquiler/:id', component: ConfirmacionAlquilerComponent },
    { path: 'reclamo-exito', component: ReclamoExitoComponent },
    { path: 'mi-cuenta/superadmin', component: SuperadminComponent },
    { path: 'mi-cuenta/superadmin/alquileres', component: AlquileresComponent },
    { path: 'mi-cuenta/superadmin/publicaciones', component: PublicacionesComponent },
    { path: 'mi-cuenta/superadmin/reclamos', component: ReclamosComponent },
    { path: 'mi-cuenta/superadmin/usuarios', component: UsuariosComponent },
    { path: 'mi-cuenta/superadmin/estadisticas', component: EstadisticasComponent },
    { path: 'mercadopago', component: PagoMercadopagoComponent },
    { path: 'users/:id', component: UsersComponent},
    { path: '**', component: ErrorComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);