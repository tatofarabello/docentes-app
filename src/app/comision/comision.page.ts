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
    const loading = await this.loading.create({  message: 'Cargando',
    //duration: 2000,
      spinner: 'bubbles'
    });  
    this.claseSrv.obtenerClasesDeComision(this.materiaSrv.comsionActiva._id).subscribe((a:Array<Clase>) => {
      this.claseSrv.clasesActivas = a;
      loading.dismiss();
      
    });
    loading.present();
    
    console.log(this.claseSrv.clasesActivas) 

  };

  configurarComision() {
    //if si tiene clases
    

  }

}

