import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {

  Cars: any = [];

  carsForm: FormGroup = new FormGroup({
    manufacturer: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required)
  });

  constructor(private _carsService: CarsService) {
    this.getCars();
   }

  ngOnInit(): void {
  }

  getCars() {
    this._carsService.getAllCars().subscribe(data => {
      this.Cars = data;
    });
    console.log(this.Cars);
  }

  addCar() {
    if (!this.carsForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    console.log(JSON.stringify(this.carsForm.value));
    this._carsService.addCar(JSON.stringify(this.carsForm.value))
      .subscribe(
        data => { console.log(data); this.getCars(); },
        error => console.log(error)
    );
  }

  deleteCar(index: string | number) {
    let id = this.Cars[index]._id;
    console.log(id);
    this._carsService.deleteCar(id).subscribe(data => {
      console.log(data); this.getCars(); },
      error => console.log(error)
    );
  }

}
