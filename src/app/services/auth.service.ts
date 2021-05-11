import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { delay, map } from 'rxjs/operators';
import { AutosModel } from '../models/autos.model';
import { RentalModel } from '../models/rental.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = 'AIzaSyAsVWzyRCWsvF-3HJes7ZswLyQ0DQQTfRw';
  userToken: string;
  userId: string;
  private urlCar = 'https://alquiler-vehiculos-8a739-default-rtdb.firebaseio.com/autos';
  private urlRent = 'https://alquiler-vehiculos-8a739-default-rtdb.firebaseio.com/rent';

  constructor( private http: HttpClient) { 
    this.readToken();
    this.readUser();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
    `${ this.urlAuth}:signInWithPassword?key=${this.apikey}`,
    authData
    ).pipe(
      map( resp => {
        this.saveToken(resp['idToken']);
        this.saveUserId(resp['localId']);
        return resp;
      })
    );
  }

  newUser(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
    `${ this.urlAuth}:signUp?key=${this.apikey}`,
    authData
    ).pipe(
      map( resp => {
        this.saveToken(resp['idToken']);
        this.saveUserId(resp['localId']);
        return resp;
      })
    );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds( 3600 );

    localStorage.setItem('expire', today.getTime().toString());
  }

  private saveUserId(localId: string) {
    this.userId = localId;
    localStorage.setItem('userId', localId);
  }

  readToken() {
    if (localStorage.getItem('token')){
      this.userToken= localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  readUser() {
    if (localStorage.getItem('userId')){
      this.userId= localStorage.getItem('userId');
    } else {
      this.userId = '';
    }

    return this.userId;
  }

  isAuthenticated(): boolean {

    if(this.userToken.length < 2) { return false; }

    const expired = Number(localStorage.getItem('expire'));
    const expiredDate = new Date();
    expiredDate.setTime(expired);
    
    if(expiredDate > new Date()) {
      return true;
    } else {
      false;
    }
  }

  getCars() {
    return this.http.get(`${ this.urlCar }.json`)
            .pipe(
              map( this.createCarsArray ),
              delay(0)
            );
  }

  private createCarsArray( carsObj: object ) {

    const cars: AutosModel[] = [];

    Object.keys( carsObj ).forEach( key => {

      const car: AutosModel = carsObj[key];
      car.id = key;

      cars.push( car );
    });
    return cars;
  }

  saveRent( rent: RentalModel ) {
    return this.http.post(`${ this.urlRent }/${this.userId}.json`, rent)
            .pipe(
              map( (resp: any) => {
                return resp;
              })
            );
  }

  getRentHistory() {
    return this.http.get(`${ this.urlRent }/${this.userId}.json`)
    .pipe(
      map( this.createRentHistoryArray ),
      delay(0)
    );
  }


  private createRentHistoryArray ( rentalObj: object ) {

    const history: RentalModel[] = [];

    Object.keys( rentalObj ).forEach( key => {

      const hist: RentalModel = rentalObj[key];
      hist.id = key;

      history.push( hist );
    });
    return history;

  }
}
