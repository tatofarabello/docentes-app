import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MyComponent } from '../method/fecha';
import { Aula } from '../model/aula';
import { ClaseService } from '../services/clase.service';

@Component({
  selector: 'app-fechayhora',
  templateUrl: './fechayhora.page.html',
  styleUrls: ['./fechayhora.page.scss'],
})
export class FechayhoraPage implements OnInit {
  public misAulas: Array<Aula>;
  public fechaInicio: Date = new Date();
  public hora: Date = new Date();
  public duracion: Date = new Date();
  constructor(public alertController: AlertController, private claseSrv: ClaseService) { }
  
  ngOnInit() {
    this.claseSrv.getAulas().subscribe((aulas: Array<Aula>) => { this.misAulas = aulas; console.log(this.misAulas) })

  }
  public async elegirAula() {
    let cuerpo = [];

    for (let aula of this.misAulas) {

        cuerpo.push({
          name: 'checkbox' + aula.id,
          type: 'radio',
          label: aula.nombre,
          value: aula._id
        })
  
        
    }

    console.log('las aulas son: ', cuerpo)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aulas',
      inputs: cuerpo,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm OK');
            console.log('La fecha de inicio es: ',this.fechaInicio,'   La hora es: ', this.hora, 'La duración es: ',this.duracion);
            this.confirmar();
            }
        }
      ]
    });

    await alert.present();

  }

  confirmar() {
    console.log('soyconfirmar: ', this.fechaInicio,'duracion es: ', this.duracion);
}

}