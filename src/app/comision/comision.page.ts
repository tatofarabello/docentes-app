import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Comision } from '../model/comision';
import { MateriaService } from '../services/materia.service';
import { MyComponent } from '../method/fecha';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.page.html',
  styleUrls: ['./comision.page.scss'],
})
export class ComisionPage implements OnInit {
  public miComision = new Comision;
  constructor(private activeteRoute:ActivatedRoute, private materiaSrv: MateriaService,private loading:LoadingController) { }

  async ngOnInit() {    
    const loading = await this.loading.create({  message: 'Cargando',
    //duration: 2000,
      spinner: 'bubbles'
    });  
    let miComision:Comision;
    this.activeteRoute.paramMap.subscribe(
      async paramMap => {
          await this.materiaSrv.getComision(paramMap.get("id")).then((datos:Comision) => {
            miComision = datos;
          });
        this.miComision = miComision;
        loading.dismiss()
      });
    loading.present();
  };

  configurarComision() {
    //if si tiene clases
    

  }

}

