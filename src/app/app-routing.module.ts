import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionComponent } from './paginas/ubicacion/ubicacion.component';
import { UbicacionesComponent } from './paginas/ubicaciones/ubicaciones.component';

const routes: Routes = [
  {path: 'ubicaciones', component: UbicacionesComponent},
  {path: 'ubicacion/:id', component: UbicacionComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'ubicaciones'}

];

@NgModule({
  imports: [ RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
