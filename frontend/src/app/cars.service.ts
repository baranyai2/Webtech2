import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private _http: HttpClient) { }

  addCar(body: any) {
    return this._http.post('http://127.0.0.1:3000/cars/addCar', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllCars() {
    return this._http.get('http://127.0.0.1:3000/cars/getAllCars');
  }

  deleteCar(id: any) {
    return this._http.delete(`http://127.0.0.1:3000/cars/deleteCar/${id}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
