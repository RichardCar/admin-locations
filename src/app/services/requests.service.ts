import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UbicacionModel } from '../models/ubicacion.model';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  endPoint = environment.endpoint;

  constructor(private http: HttpClient) { }
  crearUbicacion(ubicacion: UbicacionModel) {
    return this.http.post(`${ this.endPoint }/locations`, ubicacion)
          .pipe(
            map( (resp: any) => {
              ubicacion.id = resp.name;
              return ubicacion;
            })
          );
  }

  actualizarUbicacion(ubicacion: UbicacionModel) {
    const temp = {
      ... ubicacion
    };
    delete temp.id;
    return this.http.put(`${ this.endPoint }/locations/${ubicacion.id}`, ubicacion);
  }

  getUbicaciones() {
      return this.http.get(`${ this.endPoint }/locations`)
      .pipe( map( this.crearArreglo));
  }

  crearArreglo(ubicacionsObj: object) {
    if (ubicacionsObj === null) { return []; }
    const ubicaciones: UbicacionModel[] = [];
    console.log(ubicacionsObj);
    Object.keys( ubicacionsObj).forEach(key =>{
      const ubicacion: UbicacionModel = ubicacionsObj[key];
      ubicacion.id = key;
      ubicaciones.push(ubicacion);
    });
    console.log(ubicaciones);
    return ubicaciones;
  }

  getUbicacionPorId(id: string) {
    return this.http.get(`${ this.endPoint }/locations/${id}`);
  }

  borrarUbicacion(id: string) {
    return this.http.delete(`${ this.endPoint }/locations/${id}`);
  }
}
