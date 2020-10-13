import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProfesorService } from '../services/profesor.service';
import { Comision } from '../model/comision';
import { Materia } from '../model/materia';
import { Profesor_Comision } from '../model/profesor_comision';
import { Materia_Comision } from '../model/materia_comison';
import { Aula_Comision } from '../model/aula_comision';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class MateriaService implements OnInit{
  public misMaterias: Array<
    {
      materia: Materia,
      comisiones: Array<Comision>
    }
  > = [];
  public misComisiones: Array<Comision>;
  public materiaActiva: Materia = {nombre:'',_id:''};
  public comsionActiva: Comision;
  
  private path = "http://localhost:3000";
  
  constructor(private httpClient: HttpClient, private alContrl: AlertController, private profesorSrv: ProfesorService) { }
  ngOnInit(){
  this.materiaActiva={nombre:'',_id:''};
  }
  getMaterias() {
    return this.httpClient.get(this.path + '/materias')
  };


  async getMateriasDeProfesor() {
    this.misMaterias = [];
    let registros
    let promesaComision = this.profesorSrv.getComisionesDeProfesor().then(function (data: Array<Profesor_Comision>) { registros = data });
    await promesaComision;
      let promesaMaterias
    let materias = [];
    let comisionesSinAula = [];
      for (let registro of this.profesorSrv.inscripciones) {
        promesaMaterias = this.getMateriaDeComision(registro.id_comision).then(function (com:Materia_Comision) { materias.push(com.id_materia) });
        await this.getAulaDeComision(registro.id_comision).then(function (com: Array <Aula_Comision> = []) {
          console.log('com es:', com)
          if (com.length == 0) {
            comisionesSinAula.push(registro.id_comision)
          }});
        await promesaMaterias;

      }
   
    materias = materias.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    
      let promesaMisMaterias
      let mis_Materias=[]
      console.log('las materias son: ',materias)
    for (let materia of materias) {
      promesaMisMaterias = this.getMateria(materia).then(function (data) {mis_Materias.push(data) })
      
    }
    await promesaMisMaterias; 
    
    
    for (let materia of mis_Materias) this.misMaterias.push({ materia: materia, comisiones: [] });
    for (let materia of materias) this.obtenerComisionesDeMateria(materia);
      
      
  }

  async getMateria(id_materia) {
    return this.httpClient.get(this.path + '/materia/' + id_materia).toPromise();
  }
  
  async getMateriaDeComision(id_comision) {
    return await this.httpClient.get(this.path + '/materia_de_comision/' + id_comision).toPromise();
  }

  getComisionesDeMaterias(idMateria) {
    return this.httpClient.get(this.path + '/listaDeComisiones/' + idMateria);
  }

  async getComisionesDeAlumno() {
    return await this.httpClient.get(this.path + '/comisiones_de_alumno/' + this.profesorSrv.id).toPromise();
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

  async getProfesoresDeComision(id_comision: string) {
    return await this.httpClient.get(this.path + '/profesor_de_comisiones/' + id_comision).toPromise();
  }

  async getAulaDeComision(id_comision: string) {
    return await this.httpClient.get(this.path + '/aula_de_comision/' + id_comision).toPromise();
  }

  async obtenerComisionesDeMateria(id_materia:String) {
    let materia:Materia;
    let comisiones = [];
  await this.getMateria(id_materia).then((mat: Materia) => { materia = mat; });

    let registros = this.profesorSrv.inscripciones.filter(inscripcion => inscripcion.id_materia==id_materia )
    // console.log('registro es: ', registros)
    let promesaMaterias: Promise<void|Comision>;
    for (let registro of registros) {
      promesaMaterias = this.getComision(registro.id_comision).then(function (com:Comision) { comisiones.push(com) });
    }
    await promesaMaterias;
    for (let materia of this.misMaterias)
    {
      if (materia.materia._id==id_materia) materia.comisiones = comisiones;
    }
    // console.log('las comisiones de esta materia son :',materia.comis)
  }  
}
