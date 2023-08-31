import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    loginData={
      username:'',
      password:''
    }
    constructor(private snack:MatSnackBar ,private login:LoginService, private router:Router){

    }
    ngOnInit(): void {
        
    }
    formSubmit(){
      console.log("login  form submited!");
      if(this.loginData.username.trim()==''||this.loginData.username==null)
      {
          this.snack.open("Username is required.!",'',{
            duration:3000,
          });
          return;
      }
      if(this.loginData.password.trim()==''||this.loginData.password==null)
      {
          this.snack.open("Password is required.!",'',{
            duration:3000,
          });
          return;
      }
      //request to server to generate the token
      this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log("Success");
          console.log(data);

          //login...
          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(data);
              //redirect...ADMIN: admin-dashboard
              //redirect...NORMAL: normal-dashboard

              if(this.login.getUserRole()=="ADMIN")
              {
                //goto Admin-Dashboard
                // window.location.href='/admin';
                this.router.navigate(['admin']);
                this.login.loginStatusSubject.next(true);
              }
              else if(this.login.getUserRole()=="NORMAL")
              {
                //goto Normal user-Dashboard
                // window.location.href='/user-dashboard';
                this.router.navigate(['user-dashboard/0']);
                this.login.loginStatusSubject.next(true);
              }
              else{
                this.login.logOut();
              }
            });
        },
        (error)=>{
          console.log("Error.!");
          console.log(error);
          this.snack.open("Invalid Username and Password! Try again.",'',{
            duration:4000
          });
        }
      );
  }
}
