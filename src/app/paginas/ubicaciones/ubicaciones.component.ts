import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { UbicacionModel } from 'src/app/models/ubicacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {

  ubicaciones: UbicacionModel[] = [];
  cargando = false;

  constructor(private requestService: RequestsService) { }

  ngOnInit() {
    this.cargando = true;
    this.requestService.getUbicaciones().subscribe(resp => {
      console.log(resp);
      this.ubicaciones = resp;
      this.cargando = false;
    });
  }

  borrarUbicacion(empleado: UbicacionModel, index: number) {
    Swal.fire({
      title: '¿Está seguro?',
      icon: 'question',
      text: `Está seguro que desea borrar  ${empleado.nombre}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value) {
        this.requestService.borrarUbicacion(empleado.id).subscribe( resp => {
          this.ubicaciones.splice(index, 1);
        });
      }
    }
    );
  }

}
