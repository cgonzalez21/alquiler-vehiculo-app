import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AutosModel } from '../../models/autos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carList: boolean = true;
  rentHistory: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  rentalHistory() {
    this.carList = false;
    this.rentHistory = true;
  }

  rentCar() {
    this.carList = true;
    this.rentHistory = false;
  }

}
