import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UsuarioModel;
  rememberUser: boolean = false;

  constructor( private auth:AuthService, private router: Router ) { }

  ngOnInit() { 
    this.user = new UsuarioModel();
  }


  onSubmit( form: NgForm ) {
    if(form.invalid) { return; }

    Swal.fire({
      text: 'Espere por favor...',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.newUser(this.user).subscribe( resp => {
      Swal.close();

      if(this.rememberUser) {
        localStorage.setItem('email',this.user.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
  }
}
