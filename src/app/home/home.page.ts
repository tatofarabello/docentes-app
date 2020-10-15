//Prueba
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Profesor } from '../model/profesor';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  materia = 'Matematicas'
  tiempo = '1 dia y 4 horas'
  public profesor = new Profesor;
  scannedData: any;
  encodedData: '';
  encodeData: any;
  constructor(public profesorSrv: ProfesorService ,private lodading: LoadingController) {  }
  public async ngOnInit() {
    
    const loading = await this.lodading.create({  message: 'Cargando',
    //duration: 2000,
    spinner: 'bubbles'});  
      
    
    this.profesorSrv.getProfesor().subscribe((datos:Profesor)  => {
      this.profesor = datos;
      loading.dismiss();
    
    });
    loading.present();
  }
 



}