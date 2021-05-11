import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentalModel } from '../../models/rental.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  rentHistory: RentalModel[] = [];
  charging = false;

  ngOnInit() {
    this.charging = true;
    this.auth.getRentHistory()
      .subscribe( resp => {
        this.rentHistory = resp;
        this.charging = false;
      });
  }

}
