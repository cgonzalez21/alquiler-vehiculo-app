import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { RentalModel } from '../../models/rental.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css']
})
export class RentalCarComponent implements OnInit {
  forma: FormGroup;
  rent: RentalModel = new RentalModel();
  
  constructor( private fb: FormBuilder, private route: ActivatedRoute, private auth: AuthService, private router: Router) { 

this.createForm();

}

ngOnInit(): void {
  this.rent.carId = this.route.snapshot.paramMap.get('id');
  this.rent.modelo = this.route.snapshot.paramMap.get('modelo');
  this.rent.marca = this.route.snapshot.paramMap.get('marca');
}

get nombreNoValido() {
return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
}

get apellidoNoValido() {
return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
}

get cedulaNoValido() {
  return this.forma.get('cedula').invalid && this.forma.get('cedula').touched
  }

get correoNoValido() {
return this.forma.get('correo').invalid && this.forma.get('correo').touched
}

get distritoNoValido() {
return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
}

get ciudadNoValido() {
return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
}

createForm() {

this.forma = this.fb.group({
nombre  : ['', [ Validators.required, Validators.minLength(2) ]  ],
apellido: ['', [Validators.required ] ],
cedula: ['', [Validators.required ] ],
correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
direccion: this.fb.group({
distrito: ['', Validators.required ],
ciudad  : ['', Validators.required ],
})
});

}

save() {


if ( this.forma.invalid ) {
  return Object.values( this.forma.controls ).forEach( control => {

    if ( control instanceof FormGroup ) {
      Object.values( control.controls ).forEach( control => control.markAsTouched() );
      } else {
        control.markAsTouched();
      }});
} else {
  this.rent.nombre = this.forma.value.nombre;
  this.rent.apellido = this.forma.value.apellido;
  this.rent.cedula = this.forma.value.cedula;
  this.rent.correo = this.forma.value.correo;
  this.rent.distrito = this.forma.value.direccion.distrito;
  this.rent.ciudad = this.forma.value.direccion.ciudad;
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información de alquiler de auto',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    peticion = this.auth.saveRent( this.rent );

    peticion.subscribe( resp => {

      Swal.fire({
        title: 'Alquiler de Vehiculo',
        text: 'Se creo la orden de alquiler correctamente',
        icon: 'success'
      }).then((result) => {
        if (result) {
          this.forma.reset();
          this.router.navigateByUrl('/home');
        }
      })
    });
}
}

}
