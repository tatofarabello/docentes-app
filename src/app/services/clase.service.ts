import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clase } from '../model/clase';
import { MateriaService } from './materia.service';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private path = "http://localhost:3000";
  public clasesActivas: Array<Clase>;
  public AlumnosEnClases: Array<Array<String>>;
  public claseActiva: Clase = {
    _id: '',
    inicio: '',
    fin: '',
    hora: '',
    aula: ''
  };
  public indexOfClaseActiva: Number = 0
  constructor(private httpClient: HttpClient,private materiaSrv:MateriaService) { }
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

  obtenerClasesDeComision(id_comision:String) {
    return this.httpClient.get(this.path + '/clases_de_comision/'+id_comision)
  }
  obtenerAlumnosDeComision(id_comision: String) {
    console.log('id de la comision: ' ,id_comision)
    return this.httpClient.post(this.path + '/alumnos_en_clase', { id_comision: id_comision });
  }

  setAlumnosEnClase()
  {
    this.obtenerAlumnosDeComision(this.materiaSrv.comsionActiva._id).subscribe((matrizDeAlumnos:Array<Array<String>>) => this.AlumnosEnClases = matrizDeAlumnos);
  }

}
