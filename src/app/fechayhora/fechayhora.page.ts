import { HOST_ATTR } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MyComponent } from '../method/fecha';
import { Aula } from '../model/aula';
import { Comision } from '../model/comision';
import { ClaseService } from '../services/clase.service';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-fechayhora',
  templateUrl: './fechayhora.page.html',
  styleUrls: ['./fechayhora.page.scss'],
})
export class FechayhoraPage implements OnInit {
  private control= new Date(0)
  public misAulas: Array<Aula>;
  public fechaInicio: Date = new Date(0);
  public hora: Date = new Date(0);
  public duracion: Date = new Date(0);
  public aulaDeComision: Aula;
  public miComision:Comision;
  constructor(public alertController: AlertController, private claseSrv: ClaseService , private activeteRoute:ActivatedRoute, private materiaSrv:MateriaService) { }
  
  ngOnInit() {
    this.claseSrv.getAulas().subscribe((aulas: Array<Aula>) => { this.misAulas = aulas; console.log(this.misAulas) })
    this.control = this.fechaInicio;
    this.hora = this.fechaInicio;
    this.duracion = this.fechaInicio;
    ;
    this.activeteRoute.paramMap.subscribe(async paramMap => {
      let miComision :Comision;
      await this.materiaSrv.getComision(paramMap.get("id")).then((datos:Comision) => {
        miComision = datos;
      });
    this.miComision = miComision;
    });

  }
  public async elegirAula() {
    let cuerpo = [];

    for (let aula of this.misAulas) {

        cuerpo.push({
          name: 'checkbox' + aula.id,
          type: 'radio',
          label: aula.nombre,
          value: aula
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
            this.aulaDeComision = data;
            console.log(this.aulaDeComision.nombre)
            }
        }
      ]
    });

    await alert.present();

  }

  confirmar() {
    let año = new Date(this.fechaInicio).getFullYear();
    let mes = new Date(this.fechaInicio).getMonth();
    let dia = this.fechaInicio as unknown as string;
    dia = dia.split('-')[2];
    let hora = this.hora as unknown as string;
    let horario: Array<String> = hora.split(':');
    let duracion = this.duracion as unknown as string;
    let duracionArray: Array<String> = duracion.split(':');
    console.log('registros guardados: ', año, mes, dia, horario[0], horario[1])
    
    this.claseSrv.crearClases(año, mes, dia, horario[0], horario[1], duracionArray[0], duracionArray[1], this.miComision._id, this.aulaDeComision.nombre, this.miComision.clasesTotales).subscribe(data=>console.log(data));
    
    // console.log(this.fechaInicio, this.hora, this.aulaDeComision._id, this.duracion);
}

}