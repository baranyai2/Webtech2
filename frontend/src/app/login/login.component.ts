import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginForm.valid) {
      console.log('Invalid Form!');
      return;
    }
    console.log(JSON.stringify(this.loginForm.value));
    this._userService.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        data => {  console.log(data); this._router.navigate(['/dashboard']); },
        error => console.log(error)
    );
  }

}
