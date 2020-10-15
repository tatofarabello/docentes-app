import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Comision } from '../model/comision';
import { MateriaService } from '../services/materia.service';
import { MyComponent } from '../method/fecha';
import { Clase } from '../model/clase';
import { ClaseService } from '../services/clase.service';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.page.html',
  styleUrls: ['./comision.page.scss'],
})
export class ComisionPage implements OnInit {
  
  constructor(private activeteRoute:ActivatedRoute, private materiaSrv: MateriaService,private loading:LoadingController,private claseSrv:ClaseService) { }

  async ngOnInit() {    
    const loading = await this.loading.create({  message: 'Esto tarda un ratito',
    //duration: 2000,
      spinner: 'bubbles'
    });  

    this.claseSrv.obtenerClasesDeComision(this.materiaSrv.comsionActiva._id).subscribe((a: Array<Clase>) => {
      for (let i = 0; i < a.length-1; i++){
        for (let j = 1; j < a.length; j++){
          if (a[j].inicio < a[j - 1].inicio) {
            let aux = a[j];
            a[j] = a[j-1];
            a[j-1] = aux;
          }
        }
      }
      
      this.claseSrv.clasesActivas = a
      
      
    });
    loading.present();
    

    this.claseSrv.obtenerAlumnosDeComision(this.materiaSrv.comsionActiva._id).subscribe((matrizDeAlumnos: Array<Array<String>>) =>
    { 
      this.claseSrv.AlumnosEnClases = matrizDeAlumnos;
      loading.dismiss();
    });
    


  };


  setClaseActiva(clase: Clase)
  { 
    if (clase ==this.claseSrv.claseActiva) {
      this.claseSrv.claseActiva ={
        _id: '',
        inicio: '',
        fin: '',
        hora: '',
        aula: ''
      };
    }
    else this.claseSrv.claseActiva = clase;
    console.log('la clase activa es: ', this.claseSrv.claseActiva);
    this.claseSrv.indexOfClaseActiva = this.claseSrv.clasesActivas.indexOf(clase);
  }


  configurarComision() {
    //if si tiene clases

  }

}

