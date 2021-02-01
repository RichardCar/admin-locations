import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UbicacionModel } from 'src/app/models/ubicacion.model';
import { RequestsService } from 'src/app/services/requests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  ubicacion: UbicacionModel = new UbicacionModel();
  ubicaciones: UbicacionModel[] = [];
   constructor(private requestService: RequestsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id =  this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.requestService.getUbicacionPorId(id).subscribe((resp: UbicacionModel) => {
        if (resp !== null) {
          this.ubicacion = resp;
          this.ubicacion.id = id;
          this.requestService.getUbicaciones().subscribe((ubicaciones: UbicacionModel[]) => {
            if (resp !== null) {
              this.ubicaciones = ubicaciones;
            } else {
              this.ubicaciones = [];
            }
          });
        } else {
          this.router.navigate(['/ubicaciones']);
        }
      });
    }
  }

  Guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Form inválido');
      return;
    }
    console.log(form);
    console.log(this.ubicacion);

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.ubicacion.id) {
      peticion =  this.requestService.actualizarUbicacion(this.ubicacion);
    } else {
      peticion = this.requestService.crearUbicacion(this.ubicacion);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.ubicacion.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }

}
