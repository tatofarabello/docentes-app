import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import { Profesor } from '../model/profesor';
import {Profesor_Comision} from '../model/profesor_comision'

@Injectable({
  providedIn: 'root'
})
export class ProfesorService implements OnInit {
  public inscripciones: Array<Profesor_Comision>;
  private profesor;
  public id;
  private path = "http://localhost:3000";
  constructor(private httpClient: HttpClient, private alContrl:AlertController ) { }

  async ngOnInit() {
    this.id = sessionStorage.getItem('id');
    let registros
    await this.getComisionesDeProfesor().then(function (data: Array<Profesor_Comision>) { registros = data });
    this.inscripciones = registros;
  }

  getProfesores() {
    return this.httpClient.get(this.path + '/profesores')
    }

  getProfesor() {
    this.id = sessionStorage.getItem('id');
    console.log('el id es: ' + this.id)
    this.profesor = this.httpClient.get<Profesor>(this.path + '/profesor/' + this.id);
    return this.profesor;
  }
  registrarse(profesor: Profesor) {
    console.log(this.path + '/profesor');
    console.log(profesor);
    return this.httpClient.post(this.path + '/profesor', profesor);
  }


  logIn(datos) {
    return this.httpClient.post(this.path + '/singInProfesor', datos)
  }

  async getComisionesDeProfesor() {
    return await this.httpClient.get(this.path + '/comisiones_de_profesor/' + this.id).toPromise();
  }

  async inscribirseAComision(comision, materia) {
    console.log('materia: ', materia,' comision: ', comision, ' profesor:', this.id)
    let registro = { id_comision: comision, id_profesor: this.id ,id_materia: materia};
    return await this.httpClient.post(this.path + '/profesor_comision', registro).toPromise();
  }

  async desmatricularseAComision(id_registro: String) {
    console.log('registro a borrar:' , id_registro)
    return await this.httpClient.delete(this.path + '/profesor_comision/'+ id_registro).toPromise();
    
  }

  
  
}
