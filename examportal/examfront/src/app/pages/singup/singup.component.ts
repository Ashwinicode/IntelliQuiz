import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void { }
  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('Username is required!');
      this.snack.open("Username is required !",'',{
        duration:3000,
        horizontalPosition:'left'
      })
      return;
    }

    //addUser:user service
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
        console.log(data);
        // alert("Success");
        Swal.fire('Registeration Successful','User ID is '+data.id,'success')


      },
      (error) => {
        //error
        console.log(error);
        // alert("Something went wrong");
        this.snack.open('This username already exists! Try with another!','',{
          duration:3000,
          horizontalPosition:'left'
        })

      }
    )
  }

}


