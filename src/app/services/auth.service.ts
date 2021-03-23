import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { User } from '../models/user';

import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable()
export class AuthService {

  private url = "http://localhost:4201/api/"

  private alquiler = new BehaviorSubject<any>({});
  public datosAlquiler = this.alquiler.asObservable();
  //private url = this.url + ""

  //authSubject = new BehaviorSubject(false); 
  //private token: string;

  private _registerUrl = this.url + "register"
  private _registerGoogleUrl = this.url + "registerGoogle"
  private _registerFacebookUrl = this.url + "registerFacebook"
  private _updateFacebookImg = this.url + "updateFacebookImg"
  private _loginUrl = this.url + "login"
  private _confirmar = this.url + "confirmation"
  private _userData = this.url + "user-data?email="
  private _updateUser = this.url + "update-user?id="
  private _getImgUser = this.url + "get-img-name/"
  private _registerPublicacion = this.url + "register-publicacion?email="
  private _getPublicacion = this.url + "get-publicacion/"
  private _getPublicacionId = this.url + "get-one-publicacion/"
  private _getPublicacionesDestacadas = this.url + "get-publicaciones-destacadas/"
  private _deletePublicacion = this.url + "delete-publicacion/"
  private _updatePublicacion = this.url + "update-publicacion/"
  private _searchCategoria = this.url + "search-categoria/"
  private _searchPalabra = this.url + "search-palabra"
  private _preguntaPublicacion = this.url + "pregunta/"
  private _respuestaPublicacion = this.url + "respuesta/"
  private _pyrPublicacion = this.url + "pyr/"
  private _pyrOnePublicacion = this.url + "onePyR/"
  private _nuevaNotificacionPregunta = this.url + "notificacion-pregunta/"
  private _nuevaNotificacionRespuesta = this.url + "notificacion-respuesta/"
  private _notificacionesNuevas = this.url + "nuevas-notificaciones/"
  private _notificacionesTodas = this.url + "todas-notificaciones/"
  private _notificacionVista = this.url + "notificacion-vista/"
  private _notificacionCaducidadEntregaPropietario = this.url + "notificacion-caducidad-entrega-propietario/"
  private _notificacionCaducidadEntregaLocatario = this.url + "notificacion-caducidad-entrega-locatario/"
  private _mailPassword = this.url + "lostpassword/"
  private _newpwd = this.url + "newpwd/"
  private _alquilerProcesoPago = this.url + "registrar-alquiler/"
  private _getAlquilerPropietario = this.url + "get-alquiler-publicaciones/"
  private _getAlquilerPropios = this.url + "get-alquiler-propios/"
  private _registrarEnProcesoEntrega = this.url + "registrar-proceso-entrega/"
  private _getPropietarioAlquiler = this.url + "get-propietario-alquiler/"
  private _registrarCodigoPropietarioEntrega = this.url + "registrar-entrega-locatario/"
  private _registrarCodigoLocatarioEntrega = this.url + "registrar-entrega-propietario/"
  private _registrarReclamado = this.url + "registrar-reclamo-alquiler/"
  private _registrarReclamo = this.url + "cancelar-alquiler/"
  private _registrarVisitaPublicacion = this.url + "visitas-publicaciones/"
  private _registrarEnProcesoDevolucion = this.url + "registrar-demora-devolucion/"
  private _getVisitas = this.url + "get-visitas-publicacion/"
  private _registrarCodigoDevolucionPropietario = this.url + "registrar-devolucion-propietario/"
  private _registrarCodigoDevolucionLocatario = this.url + "registrar-devolucion-locatario/"
  private _getAllUsers = this.url + "get-all-users/"
  private _getAllReclamos = this.url + "get-all-reclamos/"
  private _getReclamosUser = this.url + "get-reclamos-user/"
  private _deleteReclamos = this.url + "delete-reclamos/"
  private _deleteUser = this.url + "delete-user/"
  private _updateSuperadminUser = this.url + "update-superadmin-user"
  private _getAllPublicaciones = this.url + "get-all-publicaciones"
  private _updateSuperadminPublicacion = this.url + "update-superadmin-publicacion"
  private _getAllAlquileres = this.url + "get-all-alquileres"
  private _deleteAlquiler = this.url + "delete-alquiler/"
  private _getAlquilerId = this.url + "get-alquiler-id/"
  private _updateSuperadminAlquiler = this.url + "update-superadmin-alquiler/"
  private _getEstadisticaPublicacionesCategorias = this.url + "get-publicaciones-x-categoria"
  private _cancelarAlquiler = this.url + "cancelarAlquiler"
  private _registrarPuntuacion = this.url + "registrar-puntuacion"
  private _verificarFinalizacion = this.url + "verificar-finalizacion"

  constructor(private http: HttpClient) { }

  /* CRUD DE USUARIOS */

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  registerGoogleUser(user) {
    return this.http.post<any>(this._registerGoogleUrl, user)
  }

  registerFacebookUser(user) {
    return this.http.post<any>(this._registerFacebookUrl, user)
  }

  updateImgFacebook(user) {
    return this.http.post<any>(this._updateFacebookImg, user)
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
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this._updateUser + _id, user, { headers: headers });
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

  registrar_EnProcesoPago(id_publicacion, name_propietario, name_locatario, cantidadDias, cantidadAlquiler, imagen, montoTotal, reembolso, titulo) {
    var objeto = { titulo: titulo }
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._alquilerProcesoPago + id_publicacion + "/" + name_propietario + "/" + name_locatario + "/" + cantidadDias + "/" + cantidadAlquiler + "/" + imagen + "/" + montoTotal + "/" + reembolso, objeto, { headers: headers });
  }

  getAlquilerPublicaciones(name_usuarioPropietario) {
    return this.http.get<any>(this._getAlquilerPropietario + name_usuarioPropietario);
  }

  getAlquilerPropios(name_usuarioLocatario) {
    return this.http.get<any>(this._getAlquilerPropios + name_usuarioLocatario);
  }

  registrar_EnProcesoEntrega(id_alquiler) {
    let params = JSON.stringify(id_alquiler);
    return this.http.post<any>(this._registrarEnProcesoEntrega + id_alquiler, params);
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

  registrar_reclamado(id_alquiler) {
    let params = JSON.stringify(id_alquiler);
    return this.http.post<any>(this._registrarReclamado + id_alquiler , params);
  }


  registrar_codigoPropietarioDevolucion(codigo) {
    let params = JSON.stringify(codigo);
    return this.http.post<any>(this._registrarCodigoDevolucionPropietario + codigo, params);
  }

  registrar_codigoLocatarioDevolucion(codigo) {
    let params = JSON.stringify(codigo);
    return this.http.post<any>(this._registrarCodigoDevolucionLocatario + codigo, params);
  }

  registrar_puntuacion(locador_o_locatario, puntuacion, comentario, id_alquiler) {
    let objeto = { locador_o_locatario: locador_o_locatario, puntuacion: puntuacion, comentario: comentario, id_alquiler: id_alquiler }
    return this.http.post<any>(this._registrarPuntuacion, objeto);
  }

  verificar_finalizacion(id_alquiler) {
    let objeto = { id_alquiler: id_alquiler };
    return this.http.post<any>(this._verificarFinalizacion, objeto);
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

  get_all_reclamos() {
    return this.http.get<any>(this._getAllReclamos);
  }

  get_reclamos_user(user) {
    return this.http.get<any>(this._getReclamosUser + user);
  }

  delete_reclamos(id) {
    return this.http.delete<any>(this._deleteReclamos + id)
  }

  registraDatosPreReclamo(datos) {
    this.alquiler.next(datos);
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

}
