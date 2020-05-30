import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { User } from '../models/user';

import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:4201/api/register"
  private _loginUrl = "http://localhost:4201/api/login"
  private _confirmar = "http://localhost:4201/api/confirmation"
  private _userData = "http://localhost:4201/api/user-data?email="
  private _updateUser = "http://localhost:4201/api/update-user?id="
  private _getImgUser = "http://localhost:4201/api/get-img-name/"
  private _registerPublicacion = "http://localhost:4201/api/register-publicacion?email="
  private _getPublicacion = "http://localhost:4201/api/get-publicacion/"
  private _getPublicacionId = "http://localhost:4201/api/get-one-publicacion/"
  private _getPublicacionesDestacadas = "http://localhost:4201/api/get-publicaciones-destacadas/"
  private _deletePublicacion = "http://localhost:4201/api/delete-publicacion/"
  private _updatePublicacion = "http://localhost:4201/api/update-publicacion/"
  private _searchCategoria = "http://localhost:4201/api/search-categoria/"
  private _searchPalabra = "http://localhost:4201/api/search-palabra"
  private _preguntaPublicacion = "http://localhost:4201/api/pregunta/"
  private _respuestaPublicacion = "http://localhost:4201/api/respuesta/"
  private _pyrPublicacion = "http://localhost:4201/api/pyr/"
  private _pyrOnePublicacion = "http://localhost:4201/api/onePyR/"
  private _nuevaNotificacionPregunta = "http://localhost:4201/api/notificacion-pregunta/"
  private _nuevaNotificacionRespuesta = "http://localhost:4201/api/notificacion-respuesta/"
  private _notificacionesNuevas = "http://localhost:4201/api/nuevas-notificaciones/"
  private _notificacionesTodas = "http://localhost:4201/api/todas-notificaciones/"
  private _notificacionVista = "http://localhost:4201/api/notificacion-vista/"
  private _notificacionCaducidadEntregaPropietario = "http://localhost:4201/api/notificacion-caducidad-entrega-propietario/"
  private _notificacionCaducidadEntregaLocatario = "http://localhost:4201/api/notificacion-caducidad-entrega-locatario/"
  private _mailPassword = "http://localhost:4201/api/lostpassword/"
  private _newpwd = "http://localhost:4201/api/newpwd/"
  private _alquilerProcesoPago = "http://localhost:4201/api/registrar-alquiler/"
  private _getAlquilerPropietario = "http://localhost:4201/api/get-alquiler-publicaciones/"
  private _getAlquilerPropios = "http://localhost:4201/api/get-alquiler-propios/"
  private _registrarEnProcesoEntrega = "http://localhost:4201/api/registrar-proceso-entrega/"
  private _getPropietarioAlquiler = "http://localhost:4201/api/get-propietario-alquiler/"
  private _registrarCodigoPropietarioEntrega = "http://localhost:4201/api/registrar-entrega-locatario/"
  private _registrarCodigoLocatarioEntrega = "http://localhost:4201/api/registrar-entrega-propietario/"
  private _registrarReclamo = "http://localhost:4201/api/cancelar-alquiler/"
  private _registrarVisitaPublicacion = "http://localhost:4201/api/visitas-publicaciones/"
  private _registrarEnProcesoDevolucion = "http://localhost:4201/api/registrar-demora-devolucion/"
  private _getVisitas = "http://localhost:4201/api/get-visitas-publicacion/"
  private _registrarCodigoDevolucionPropietario = "http://localhost:4201/api/registrar-finalizacion-propietario/"
  private _registrarCodigoDevolucionLocatario = "http://localhost:4201/api/registrar-finalizacion-locatario/"
  private _getAllUsers = "http://localhost:4201/api/get-all-users/"
  private _deleteUser = "http://localhost:4201/api/delete-user/"
  private _updateSuperadminUser = "http://localhost:4201/api/update-superadmin-user"
  private _getAllPublicaciones = "http://localhost:4201/api/get-all-publicaciones"
  private _updateSuperadminPublicacion = "http://localhost:4201/api/update-superadmin-publicacion"
  private _getAllAlquileres = "http://localhost:4201/api/get-all-alquileres"
  private _deleteAlquiler = "http://localhost:4201/api/delete-alquiler/"
  private _getAlquilerId = "http://localhost:4201/api/get-alquiler-id/"
  private _updateSuperadminAlquiler = "http://localhost:4201/api/update-superadmin-alquiler/"
  private _getEstadisticaPublicacionesCategorias = "http://localhost:4201/api/get-publicaciones-x-categoria"
  private _cancelarAlquiler = "http://localhost:4201/api/cancelarAlquiler"
  private _getTiposDniMercadoPago = "https://api.mercadopago.com/v1/identification_types"
  private _postPagoTarjeta = "http://localhost:4201/api/pago-tarjeta-mp"
  //authSubject = new BehaviorSubject(false); 
  //private token: string;


  constructor(private http: HttpClient) { }

  /* CRUD DE USUARIOS */

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  mailPassword(user) {
    return this.http.post<any>(this._mailPassword, user)
  }

  confirmar(token) {
    return this.http.post<any>(this._confirmar, { token: token });
  }

  newPwd(user, token) {
    return this.http.post<any>(this._newpwd, { token: token, user: user })
  }

  user_data(email) {
    return this.http.get<any>(this._userData + email)
  }

  update_user(user, _id) {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this._updateUser + _id, params, { headers: headers });
  }

  update_superadmin_user(user) {
    // let params = JSON.stringify(user);
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this._updateSuperadminUser, user); //params, { headers: headers }
  }

  get_image(id) {
    return this.http.get<any>(this._getImgUser + id);
  }

  get_all_users() {
    return this.http.get<any>(this._getAllUsers);
  }

  delete_user(mail) {
    return this.http.delete<any>(this._deleteUser + mail)
  }


  /* CRUD DE PUBLICACIONES */

  registrarPublicacion(email, publicacion) {
    return this.http.post<any>(this._registerPublicacion + email, publicacion);
  }

  get_publicacion(email) {
    return this.http.get<any>(this._getPublicacion + email);
  }

  delete_publicacion(id) {
    return this.http.delete<any>(this._deletePublicacion + id);
  }

  get_publicacion_id(id) {
    return this.http.get<any>(this._getPublicacionId + id);
  }

  update_publicacion(id, publicacion) {
    let params = JSON.stringify(publicacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._updatePublicacion + id, params, { headers: headers });
  }

  update_superadmin_publicacion(publicacion) {
    return this.http.post<any>(this._updateSuperadminPublicacion, publicacion);
  }

  get_publicaciones_destacadas() {
    return this.http.get<any>(this._getPublicacionesDestacadas)
  }

  get_all_publicaciones() {
    return this.http.get<any>(this._getAllPublicaciones);
  }



  /* BÚSQUEDA DE CATEGORIAS Y PUBLICACIONES */
  search_categoria(parametros) {
    return this.http.get<any>(this._searchCategoria + "?" + parametros);
  }

  search_palabra(palabra, parametros) {
    let objeto = { 'palabra': palabra }
    return this.http.post<any>(this._searchPalabra + "?" + parametros, objeto);
  }


  /* CRUD DE PREGUNTAS Y RESPUESTAS DE PUBLICACIONES */
  get_preguntas_respuestas(id) {
    return this.http.get<any>(this._pyrPublicacion + id)
  }

  get_una_pregunta_respuesta(id) {
    return this.http.get<any>(this._pyrOnePublicacion + id)
  }

  post_pregunta_publicacion(id, name, pregunta) {
    let params = JSON.stringify(pregunta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._preguntaPublicacion + id + "/" + name, params, { headers: headers });
  }

  post_respuesta_publicacion(id, name, respuesta) {
    let params = JSON.stringify(respuesta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._respuestaPublicacion + id + "/" + name, params, { headers: headers });
  }


  /* NOTIFICACIONES */
  notificacion_pregunta_publicacion(origen, destino, titulo, imagen, id_publicacion) {
    let params = JSON.stringify(id_publicacion);
    return this.http.post<any>(this._nuevaNotificacionPregunta + origen + "/" + destino + "/" + titulo + "/" + imagen + "/" + id_publicacion, params);
  }

  notificacion_respuesta_publicacion(origen, destino, titulo, imagen, id_publicacion) {
    let params = JSON.stringify(id_publicacion);
    return this.http.post<any>(this._nuevaNotificacionRespuesta + origen + "/" + destino + "/" + titulo + "/" + imagen + "/" + id_publicacion, params);
  }

  notificacion_nueva(username) {
    return this.http.get<any>(this._notificacionesNuevas + username);
  }

  notificaciones_todas(username) {
    return this.http.get<any>(this._notificacionesTodas + username);
  }

  notificacion_vista(notificacion) {
    let params = JSON.stringify(notificacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._notificacionVista, params, { headers: headers });
  }

  notificacion_caducidadEntregaPropietario(fechaActual, fechaCaducidad, imagen, id_publicacion, name_usuario_propietario, name_usuario_locatario, id_alquiler) {
    var objeto = { fechaActual: fechaActual, fechaCaducidad: fechaCaducidad };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._notificacionCaducidadEntregaPropietario + imagen + "/" + id_publicacion + "/" + name_usuario_propietario + "/" + name_usuario_locatario + "/" + id_alquiler, objeto, { headers: headers });
  }

  notificacion_caducidadEntregaLocatario(fechaActual, fechaCaducidad, imagen, id_publicacion, name_usuario_propietario, name_usuario_locatario, id_alquiler) {
    var objeto = { fechaActual: fechaActual, fechaCaducidad: fechaCaducidad };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._notificacionCaducidadEntregaLocatario + imagen + "/" + id_publicacion + "/" + name_usuario_propietario + "/" + name_usuario_locatario + "/" + id_alquiler, objeto, { headers: headers });
  }


  /* MIS ALQUILERES */
  get_all_alquileres() {
    return this.http.get<any>(this._getAllAlquileres);
  }

  get_alquiler_id(id) {
    return this.http.get<any>(this._getAlquilerId + id);
  }

  delete_alquiler(id) {
    return this.http.delete<any>(this._deleteAlquiler + id);
  }

  registrar_EnProcesoPago(id_publicacion, name_propietario, name_locatario, cantidadDias, cantidadAlquiler, imagen) {
    let params = JSON.stringify(id_publicacion);
    return this.http.post<any>(this._alquilerProcesoPago + id_publicacion + "/" + name_propietario + "/" + name_locatario + "/" + cantidadDias + "/" + cantidadAlquiler + "/" + imagen, params);
  }

  getAlquilerPublicaciones(name_usuarioPropietario) {
    return this.http.get<any>(this._getAlquilerPropietario + name_usuarioPropietario);
  }

  getAlquilerPropios(name_usuarioLocatario) {
    return this.http.get<any>(this._getAlquilerPropios + name_usuarioLocatario);
  }

  registrar_EnProcesoEntrega(id_publicacion) {
    let params = JSON.stringify(id_publicacion);
    return this.http.post<any>(this._registrarEnProcesoEntrega + id_publicacion, params);
  }

  registrar_codigoPropietarioEntrega(codigo) {
    let params = JSON.stringify(codigo);
    return this.http.post<any>(this._registrarCodigoPropietarioEntrega + codigo, params);
  }

  registrar_codigoLocatarioEntrega(codigo) {
    let params = JSON.stringify(codigo);
    return this.http.post<any>(this._registrarCodigoLocatarioEntrega + codigo, params);
  }

  getPropietarioAlquiler(username) {
    return this.http.get<any>(this._getPropietarioAlquiler + username);
  }

  registrar_enProcesoDevolucion(name_propietario) {
    let objeto = {}
    return this.http.post<any>(this._registrarEnProcesoDevolucion + name_propietario, objeto);
  }

  registrar_codigoPropietarioDevolucion(codigo) {
    let params = JSON.stringify(codigo);
    return this.http.post<any>(this._registrarCodigoDevolucionPropietario + codigo, params);
  }

  registrar_codigoLocatarioDevolucion(codigo) {
    let params = JSON.stringify(codigo);
    return this.http.post<any>(this._registrarCodigoDevolucionLocatario + codigo, params);
  }

  update_superadmin_alquiler(alquiler) {
    return this.http.post<any>(this._updateSuperadminAlquiler, alquiler);
  }

  cancelarAlquiler(alquiler) {
    return this.http.post<any>(this._cancelarAlquiler, alquiler);
  }


  //Reclamo
  registrar_reclamo(reclamo) {
    return this.http.post<any>(this._registrarReclamo, reclamo);
  }

  /* ESTADISTICAS*/
  registrar_visita_publicacion(id_publicacion) {
    return this.http.post<any>(this._registrarVisitaPublicacion + id_publicacion, { id_publicacion: id_publicacion });
  }

  get_visitas_id(id) {
    return this.http.get<any>(this._getVisitas + id)
  }

  get_estadistica_publicaciones_categorias() {
    return this.http.get<any>(this._getEstadisticaPublicacionesCategorias)
  }


  /* MERCADO PAGO */
  get_tipos_dni(token) {
    return this.http.get<any>(this._getTiposDniMercadoPago + '?access_token=' + token)
  }

  pago_tarjeta(data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._postPagoTarjeta, data, { headers: headers })
  }

}
