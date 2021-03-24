import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MaterialModule } from './material/material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from '../environments/environment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/mi-cuenta/perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './components/auth-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ConfirmacionEmailComponent } from './components/confirmacionemail/confirmacionemail.component';
import { ConfirmaComponent } from './components/confirma/confirma.component';
import { RegisterPublicacionComponent } from './components/register-publicacion/register-publicacion.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/navigation/header/header.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { SingletonService } from './components/singleton.service'
import { DropdownModule } from 'angular-custom-dropdown'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PublicacionExitoComponent } from './components/publicacion-exito/publicacion-exito.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DestacacionPublicacionComponent } from './components/destacacion-publicacion/destacacion-publicacion.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MisPublicacionesComponent } from './components//mi-cuenta/mis-publicaciones/mis-publicaciones.component';
import { MisAlquileresComponent } from './components//mi-cuenta/mis-alquileres/mis-alquileres.component';
import { ConfirmacionDestacacionComponent } from './components/confirmacion-destacacion/confirmacion-destacacion.component';
import { DetallePublicacionComponent } from './components/publicaciones/detalle-publicacion/detalle-publicacion.component';
import { EditarPublicacionComponent } from './components/publicaciones/editar-publicacion/editar-publicacion.component';
import { BusquedaPublicacionesComponent } from './components/busqueda/busqueda-publicaciones/busqueda-publicaciones.component';
import { BusquedaCategoriasComponent } from './components/busqueda/busqueda-categorias/busqueda-categorias.component';
import { SoloNumerosDirective } from './components/mi-cuenta/perfil-usuario/inputSoloNumeros.directive';
import { SoloLetrasDirective } from './components/mi-cuenta/perfil-usuario/inputSoloLetras.directive';
import { LostPasswordComponent } from './components/login/lostpassword/lostpassword.component';
import { ConfirmaLostPasswordComponent } from './components/login/lostpassword/confirmalostpassword/confirmalostpassword.component';
import { PosAlquilerComponent } from './components/pos-alquiler/pos-alquiler.component';
import { DeshabilitarDialogComponent } from './components/mi-cuenta/mis-publicaciones/deshabilitar-dialog/dehsabilitar-dialog';
import { EliminarDialogComponent } from './components/mi-cuenta/mis-publicaciones/eliminar-dialog/eliminar-dialog.component';
import { NotificacionesComponent } from './components/mi-cuenta/notificaciones/notificaciones.component';
import { ConfirmacionAlquilerComponent } from './components/confirmacion-alquiler/confirmacion-alquiler.component';
import { NewpwdComponent } from './components/newpwd/newpwd.component';
import { DatosPropietarioDialogComponent } from './components/mi-cuenta/mis-alquileres/datos-propietario-dialog/datos-propietario-dialog.component';
import { EliminarAlquilerDialogComponent } from './components/mi-cuenta/mis-alquileres/eliminar-alquiler-dialog/eliminar-alquiler-dialog.component';
import { DatosLocatarioDialogComponent } from './components/mi-cuenta/mis-alquileres/datos-locatario-dialog/datos-locatario-dialog.component';
import { CodigoLocatarioDialogComponent } from './components/mi-cuenta/mis-alquileres/codigo-locatario-dialog/codigo-locatario-dialog.component';
import { CodigoPropietarioDialogComponent } from './components/mi-cuenta/mis-alquileres/codigo-propietario-dialog/codigo-propietario-dialog.component';
import { StarRatingComponent } from './components/busqueda/busqueda-publicaciones/star-rating.component'
import { CancelarDialogComponent } from './components/mi-cuenta/mis-alquileres/cancelar-dialog/cancelar-dialog.component';
import { CancelarAlquilerComponent } from './components/cancelar-alquiler/cancelar-alquiler.component';
import { ReclamarAlquilerComponent } from './components/reclamar-alquiler/reclamar-alquiler.component';
import { PrereclamoComponent } from './components/prereclamo/prereclamo.component';
import { ReclamoExitoComponent } from './components/reclamo-exito/reclamo-exito.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { CodigoDevolucionLocatarioDialogComponent } from './components/mi-cuenta/mis-alquileres/codigo-devolucion-locatario-dialog/codigo-devolucion-locatario-dialog.component';
import { CodigoDevolucionPropietarioDialogComponent } from './components/mi-cuenta/mis-alquileres/codigo-devolucion-propietario-dialog/codigo-devolucion-propietario-dialog.component';
import { SuperadminComponent } from './components/mi-cuenta/superadmin/superadmin.component';
import { UsuariosComponent } from './components/mi-cuenta/superadmin/usuarios/usuarios.component';
import { PublicacionesComponent } from './components/mi-cuenta/superadmin/publicaciones/publicaciones.component';
import { AlquileresComponent } from './components/mi-cuenta/superadmin/alquileres/alquileres.component';
import { ReclamosComponent } from './components/mi-cuenta/superadmin/reclamos/reclamos.component';
import { EstadisticasComponent } from './components/mi-cuenta/superadmin/estadisticas/estadisticas.component';
import { DatosUsuariosDialogComponent } from './components/mi-cuenta/superadmin/usuarios/datos-usuarios-dialog/datos-usuarios-dialog.component';
import { EliminarUsuarioDialogComponent } from './components/mi-cuenta/superadmin/usuarios/eliminar-usuario-dialog/eliminar-usuario-dialog.component';
import { ModificarUsuarioDialogComponent } from './components/mi-cuenta/superadmin/usuarios/modificar-usuario-dialog/modificar-usuario-dialog.component';
import { DatosPublicacionesDialogComponent } from './components/mi-cuenta/superadmin/publicaciones/datos-publicaciones-dialog/datos-publicaciones-dialog.component';
import { EliminarPublicacionDialogComponent } from './components/mi-cuenta/superadmin/publicaciones/eliminar-publicacion-dialog/eliminar-publicacion-dialog.component';
import { ModificarPublicacionDialogComponent } from './components/mi-cuenta/superadmin/publicaciones/modificar-publicacion-dialog/modificar-publicacion-dialog.component';
import { DatosAlquileresDialogComponent } from './components/mi-cuenta/superadmin/alquileres/datos-alquileres-dialog/datos-alquileres-dialog.component';
import { ModificarAlquilerDialogComponent } from './components/mi-cuenta/superadmin/alquileres/modificar-alquiler-dialog/modificar-alquiler-dialog.component';
import { EliminarAlquilerSuperadminDialogComponent } from './components/mi-cuenta/superadmin/alquileres/eliminar-alquiler-dialog/eliminar-alquiler-dialog.component';
import { PagoMercadopagoComponent } from './components/pago-mercadopago/pago-mercadopago.component';
import { BarraLateralComponent } from './components/mi-cuenta/barra-lateral/barra-lateral.component';
import { PuntuacionComponent } from './components/mi-cuenta/mis-alquileres/puntuacion-dialog/puntuacion-dialog.component';
import { MisReclamosComponent } from './components/mi-cuenta/mis-reclamos/mis-reclamos.component';
import { BarraLateralSaComponent } from './components/mi-cuenta/superadmin/barra-lateral-sa/barra-lateral-sa.component';
import { PuntuacionObtenidaDialogComponent } from './components/mi-cuenta/mis-alquileres/puntuacion-obtenida-dialog/puntuacion-obtenida-dialog.component';
import { UsersComponent } from './components/users/users.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LostPasswordComponent,
    ConfirmaLostPasswordComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    ErrorComponent,
    TerminosCondicionesComponent,
    AboutComponent,
    RegisterComponent,
    CategoriasComponent,
    RegisterPublicacionComponent,
    ConfirmacionEmailComponent,
    ConfirmaComponent,
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
    PublicacionExitoComponent,
    DestacacionPublicacionComponent,
    MiCuentaComponent,
    MisPublicacionesComponent,
    MisAlquileresComponent,
    ConfirmacionDestacacionComponent,
    DetallePublicacionComponent,
    EditarPublicacionComponent,
    BusquedaPublicacionesComponent,
    BusquedaCategoriasComponent,
    SoloNumerosDirective,
    SoloLetrasDirective,
    SoloNumerosDirective,
    PosAlquilerComponent,
    DeshabilitarDialogComponent,
    EliminarDialogComponent,
    NotificacionesComponent,
    ConfirmacionAlquilerComponent,
    NewpwdComponent,
    DatosPropietarioDialogComponent,
    EliminarAlquilerDialogComponent,
    DatosLocatarioDialogComponent,
    CodigoLocatarioDialogComponent,
    CodigoPropietarioDialogComponent,
    StarRatingComponent,
    CancelarAlquilerComponent,
    CancelarDialogComponent,
    ReclamarAlquilerComponent,
    PrereclamoComponent,
    ReclamoExitoComponent,
    CodigoDevolucionLocatarioDialogComponent,
    CodigoDevolucionPropietarioDialogComponent,
    SuperadminComponent,
    UsuariosComponent,
    PublicacionesComponent,
    AlquileresComponent,
    ReclamosComponent,
    EstadisticasComponent,
    DatosUsuariosDialogComponent,
    EliminarUsuarioDialogComponent,
    ModificarUsuarioDialogComponent,
    DatosPublicacionesDialogComponent,
    EliminarPublicacionDialogComponent,
    ModificarPublicacionDialogComponent,
    DatosAlquileresDialogComponent,
    ModificarAlquilerDialogComponent,
    EliminarAlquilerSuperadminDialogComponent,
    PagoMercadopagoComponent,
    BarraLateralComponent,
    PuntuacionComponent,
    MisReclamosComponent,
    BarraLateralSaComponent,
    PuntuacionObtenidaDialogComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MaterialModule,
    DropdownModule,
    MaterialFileInputModule,
    NgxDropzoneModule,
    SwiperModule,
    FusionChartsModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAnalyticsModule 
  ],
  providers: [appRoutingProviders, AuthService, SingletonService, { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }],
  bootstrap: [AppComponent],
  entryComponents: [DeshabilitarDialogComponent, EliminarDialogComponent, DatosPropietarioDialogComponent, EliminarAlquilerDialogComponent,
    DatosLocatarioDialogComponent, CodigoPropietarioDialogComponent, CodigoLocatarioDialogComponent, CodigoDevolucionLocatarioDialogComponent,
    CodigoDevolucionPropietarioDialogComponent, EliminarUsuarioDialogComponent, DatosUsuariosDialogComponent, ModificarUsuarioDialogComponent, DatosPublicacionesDialogComponent, EliminarPublicacionDialogComponent, ModificarPublicacionDialogComponent,
    DatosAlquileresDialogComponent, ModificarAlquilerDialogComponent, EliminarAlquilerSuperadminDialogComponent, CancelarDialogComponent, PuntuacionComponent, PuntuacionObtenidaDialogComponent]
})
export class AppModule { }
