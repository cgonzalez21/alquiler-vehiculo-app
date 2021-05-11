import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UsuarioModel = new UsuarioModel();
  rememberUser: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }

  checkValue(event: any){
    if(event = 'B') {
      localStorage.removeItem('email');
    }
    if(event = 'A') {
      if(this.rememberUser) {
        localStorage.setItem('email',this.user.email);
      }

    }
 }

  logIn(form: NgForm) {
    
    if(form.invalid) { return; }

    Swal.fire({
      text: 'Espere por favor...',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.logIn(this.user).subscribe( resp => {
      Swal.close();
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
