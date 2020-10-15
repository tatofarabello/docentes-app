import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Comision } from '../model/comision';
import { Profesor_Comision } from '../model/profesor_comision';
import { ProfesorService } from '../services/profesor.service';
import { MateriaService } from '../services/materia.service';
import { Materia } from '../model/materia';
import { async } from '@angular/core/testing';
import { Materia_Comision } from '../model/materia_comison';
import { Aula_Comision } from '../model/aula_comision';
import { MateriaConComision } from '../model/materia_con_comision';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  public micComisiones: Array<Comision>;
  private todasLasMaterias;
  private inscripciones : Array<Profesor_Comision>;
  private id_materia_activa: string='';

  
  constructor(private alertController: AlertController, private profesorSrv: ProfesorService, private materiaSrv: MateriaService, private loading: LoadingController) { }
  
  async ngOnInit() { 
    const loading = await this.loading.create({  message: 'Cargando',
    //duration: 2000,
      spinner: 'bubbles'
    });
    loading.present();
    await this.profesorSrv.ngOnInit()
      this.profesorSrv.id = sessionStorage.getItem('id');
      await this.materiaSrv.ngOnInit()
    loading.dismiss()
  }
  
  public async elegirCarrera() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Carrera',
      inputs: [
        {
          name: 'checkbox1',
          type: 'radio',
          label: 'Checkbox 1',
          value: 'value1',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'radio',
          label: 'Checkbox 2',
          value: 'value2'
        }
      ],
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
          handler: data => {
            console.log('Materia:', data);
          }
        }
      ]
    });

    
  }
  public async elegirMateria() {
    let cuerpo = [];
    
    for (let mat of this.materiaSrv.todasLasMaterias) {
      let bandera =true
      for (let miMat of this.materiaSrv.misMaterias) {
        if (miMat.materia._id == mat._id) bandera = false;
      }
      if (bandera==true)
      {  cuerpo.push( {
          name: 'checkbox'+mat._id,
          type: 'radio',
          label: mat.nombre,
          value: mat._id
      })
      };
        
    }

    console.log('las materias son: ', cuerpo)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Materia',
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
            console.log(data)
            this.elegirComision(data,false);

          }
        }
      ]
    });

    await alert.present();
  }

  public async elegirComision(materia = this.materiaSrv.materiaActiva._id, comisionNueva = false) {
    let comisiones
    let cuerpo = [];
    this.materiaSrv.getComisionesDeMaterias(materia).then(async datos => {
      comisiones = datos
      console.log(comisiones)
     
      let promesas
      let promesa
      if (comisionNueva == false) {
        let promesa
        for (let id_comision of comisiones) {
          console.log('buscar comision con nro de id ' + id_comision)
          let comisionCompleta: Comision;
          promesa= this.materiaSrv.getComision(id_comision).then(function(data:Comision){comisionCompleta=data})
          await promesa
          console.log('en data hay', comisionCompleta)
  
          let bandera =true
          for (let miCom of this.materiaSrv.misComisiones) {
            if (miCom._id == comisionCompleta._id) bandera = false;
          }
          if (bandera==true)
          {cuerpo.push({
            name: 'checkbox' + comisionCompleta.id,
            type: 'radio',
            label: comisionCompleta.nombre,
            value: comisionCompleta._id
          })
          };
  
          console.log('hice el push')
        }
      }
      await promesa
      if (comisionNueva == false) {
        cuerpo.push({
          name: 'nombre',
          type: 'text',
          label: 'Otra',
          value: true
        })
      }
      else {
        cuerpo.push({
          name: 'nombre',
          type: 'text',
          label: 'Otra',
          placeholder: 'Ingresar nueva comision'        })
      }
      const alert = await this.alertController.create({
      
        cssClass: 'my-custom-class',
        header: 'Comisión',
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
            handler: async (comision) => {
              if (comision == undefined) {
                this.alertaDeNoSeleccion(materia);
              }
              if (comision == true) this.elegirComision(materia, true);
              else {
                console.log('Confirm OK');
                console.log(comision.nombre)
                console.log(materia)
                var existeComision = false;
                for (let com of comisiones) {
                  if (com == comision) {
                    let prom = this.profesorSrv.inscribirseAComision(com, materia).then(nuevo => console.log(nuevo));
                    await prom
                    existeComision = true;
                    this.ngOnInit();
                  }
                }
                if (existeComision == false) {
                  console.log(existeComision)

                  const alerta = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Cantidad de clases',
                    inputs: [
                      {
                        name: 'clasesTotales',
                        type: 'text',
                        label: 'N° Clases',
                        checked: true
                      }
                    ],
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
                        handler: async data => {
                          console.log('Cantidad de clases:', data);
                          let com = { nombre: comision.nombre, clasesTotales: data.clasesTotales }
                          let comision2
                         let hola = this.materiaSrv.crearComision(com).then((comis: Comision) => {
                           console.log('La nueva comisión es: ', comis);
                           comision2 = comis
                         })
                          await hola
                            promesa = this.profesorSrv.inscribirseAComision(comision2._id, materia).then(async nuevisimo => {
                              console.log('Esto es el registro de la inscripcion a la comision', nuevisimo);

                            });
                            await promesa
                            let registro = { id_materia: materia, id_comision: comision2._id }
                            let ultimaPromesa = this.materiaSrv.crearMateria_Comision(registro).then(materiacomision => console.log('esta es la materia comision: ', materiacomision));
                            await ultimaPromesa

                          this.ngOnInit();

                        }
                      }
                    ]
                  });
                  await alerta.present();
              

                }

              

                //Falta desabilitar boton si no hay comision seleccionada
                            
              }}
            }
           ]
      });
  
      await alert.present();



    });
  }

  public async alertaDeNoSeleccion(materia) {

    const cuerpoAleta = {
      header: "ERROR",
      subHeader: "No selecciono ninguna comision",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler:async () => {
            this.elegirComision(materia, false);    
        }
            
            
                          
          
        }
      ]
    };
  
    const alert = await this.alertController.create(cuerpoAleta)
    await alert.present();
  }

  public async borrarMateria(materia: MateriaConComision) {
    const cuerpoAleta = {
      header: "Desmatricularse",
      subHeader: "¿Seguro que desea desmatricularse de " + materia.materia.nombre +'?',
      message: 'Perderá toda la información asociada a la materia',
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
          handler: async () => {
            let registros
            let promesaComision = this.profesorSrv.getComisionesDeProfesor().then(function (data: Array<Profesor_Comision>) { registros = data });
            await promesaComision;
            console.log('Registros es:',registros)
            for (let inscripcion of registros) {
              console.log('el id de la materia es: ', materia.materia._id)
              if (inscripcion.id_materia == materia.materia._id){
                //borrar el registro de inscripcion
                
                await this.profesorSrv.desmatricularseAComision(inscripcion._id as String).then(nuevo => {
                  nuevo; this.ngOnInit(); console.log('Confirm OK');
              
                });
              }
            }
            
           
                          
          }
        }
      ]
    };
  
    const alert = await this.alertController.create(cuerpoAleta)
    await alert.present();
  }
  public async warningAulas(loading){

    const cuerpoAleta = {
      header: "Atención",
      
      message: 'Tiene comisiones sin aulas',
      buttons: ["ok"]
    };
    const alerta = await this.alertController.create(cuerpoAleta);
    loading.dismiss();
    await alerta.present();

 
    
  }

  async mostrarComisiones(id_materia) {
    
    if (this.materiaSrv.materiaActiva._id == id_materia) this.materiaSrv.materiaActiva= {nombre:'',_id:''};
    else 
    { 
      for (let materiaAMostrar of this.materiaSrv.misMaterias) {
      if (materiaAMostrar.materia._id == id_materia) {
        this.materiaSrv.materiaActiva = materiaAMostrar.materia;
        this.materiaSrv.misComisiones = materiaAMostrar.comisiones;
      };
    }
  }}


  public async borrarComision(comision:Comision) {

    const cuerpoAleta = {
      header: "Desmatricularese",
      subHeader: "¿Seguro que desea desmatricularse de " + comision.nombre +'?',
      message: 'Perderá toda la información asociada a la comision',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler:async () => {
                      
            let inscripcion: Array<Profesor_Comision> = this.profesorSrv.inscripciones.filter(inscripcion => inscripcion.id_comision==comision._id )
            await this.profesorSrv.desmatricularseAComision(inscripcion[0]._id as String).then(nuevo => { nuevo; console.log('Confirm OK'); this.ngOnInit();});
            // console.log('borrara esta inscripcion: ', inscripcion)
            
          }
            
            
                          
          
        }
      ]
    };
  
    const alert = await this.alertController.create(cuerpoAleta)
    await alert.present();
  }


  setComisionActiva(comision)
  {
    this.materiaSrv.comsionActiva = comision;
  }
}