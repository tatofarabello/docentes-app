import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'materias',
    children: [{
      path: "",
      loadChildren: () => import('./materias/materias.module').then( m => m.MateriasPageModule)
      
    },
    {
      path: ':id',
      loadChildren: () => import('./comision/comision.module').then( m => m.ComisionPageModule)
    },
    ]
    
  },
  {
    path: 'materia',
    loadChildren: () => import('./materia/materia.module').then( m => m.MateriaPageModule)
  },
  {
    path: 'comision',
    loadChildren: () => import('./comision/comision.module').then( m => m.ComisionPageModule)
  },
  {
    path: 'clase',
    loadChildren: () => import('./clase/clase.module').then( m => m.ClasePageModule)
  },
  {
    path: 'fechayhora',
    loadChildren: () => import('./fechayhora/fechayhora.module').then( m => m.FechayhoraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
