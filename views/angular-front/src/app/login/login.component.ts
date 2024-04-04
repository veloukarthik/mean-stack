import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = ''
  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login() {

    let user = this.loginForm.value;

    let data = {
      email: user.email,
      password: user.password
    }

    this.user.login(data).subscribe(
      (res: any) => {
        if (res.status) {
          let user = JSON.stringify(res.data)
          localStorage.setItem('user',user);
          localStorage.setItem('token',res.data.token);
          setInterval(()=>{
            location.reload()
          },3000)
        }
        console.log("res", res);
      },
      (e: any) => {
        console.log("error", e.error.status);
        console.log("error", e.error.message);
        if (e.error.status == false) {
          this.errorMessage = e.error.message;
        }
      }
    );
  }

}
