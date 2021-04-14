import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (!this.registerForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    // console.log(JSON.stringify(this.registerForm.value));
    this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => {console.log(data); this._router.navigate(['/login']); },
        error => console.log(error)
      );
  }

}
