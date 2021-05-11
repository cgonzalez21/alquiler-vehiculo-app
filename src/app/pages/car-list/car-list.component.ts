import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AutosModel } from '../../models/autos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  cars: AutosModel[] = [];
  charging = false;

  ngOnInit() {
    this.charging = true;
    this.auth.getCars()
      .subscribe( resp => {
        this.cars = resp;
        this.charging = false;
      });
  }

}
