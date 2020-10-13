import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private path = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }
  public getAulas() {
    return this.httpClient.get(this.path + '/aulas')
  }
  public crearClases(año, mes, dia, hora, minutos, duracion_h, duracion_m, id_comision, aula_id,clasesTotales)
  {
    let cuerpo = {
      año: año,
      mes: mes,
      dia: dia,
      hora: hora,
      minutos: minutos,
      duracion_h: duracion_h,
      duracion_m: duracion_m,
      id_comision: id_comision,
      aula: aula_id,
      cantidad:clasesTotales
    }
    return this.httpClient.post(this.path + '/crear_clases',cuerpo)
    
  }

}
