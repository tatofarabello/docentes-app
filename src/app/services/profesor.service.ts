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

  ngOnInit(): void {
    this.id = sessionStorage.getItem('id');
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

  async getMateria(id_materia) {
    return await this.httpClient.get(this.path + '/materia/' + id_materia).toPromise();
  }

  async getMateriaDeComision(id_comision) {
    return await this.httpClient.get(this.path + '/materia_de_comision/' + id_comision).toPromise();
  }

  getMaterias() {
    return this.httpClient.get(this.path + '/materias')
  }

  logIn(datos) {
    return this.httpClient.post(this.path + '/singInProfesor', datos)
  }
  getComisionesDeMaterias(idMateria) {
    return this.httpClient.get(this.path + '/listaDeComisiones/' + idMateria)
  }

  async getComision(idComision) {

    return await this.httpClient.get(this.path + '/comision/' + idComision).toPromise()
    
  }

 

  async crearComision(comision) {
    return await this.httpClient.post(this.path + '/comision', comision).toPromise();
    
  }
  
  async crearMateria_Comision(registro) {
    return await this.httpClient.post(this.path + '/materia_comision', registro).toPromise();
    
  }    
  
  

  async getComisionesDeProfesor() {
    return await this.httpClient.get(this.path + '/comisiones_de_profesor/' + this.id).toPromise();
  }

  async inscribirseAComision(comision, materia) {
    console.log('materia: ', materia,' comision: ', comision, ' profesor:', this.id)
    let registro = { id_comision: comision, id_profesor: this.id ,id_materia: materia};
    return await this.httpClient.post(this.path + '/profesor_comision', registro).toPromise();
  }

  desmatricularseAComision(id_registro: String) {
    console.log('registro a borrar:' , id_registro)
    return this.httpClient.delete(this.path + '/profesor_comision/'+ id_registro);
    
  }

  async getProfesoresDeComision(id_comision: string) {
    return await this.httpClient.get(this.path + '/profesor_de_comisiones/' + id_comision).toPromise();
  }

  async getAulaDeComision(id_comision: string) {
    return await this.httpClient.get(this.path + '/aula_de_comision/' + id_comision).toPromise();
  }
  
}
