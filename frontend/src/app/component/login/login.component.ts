import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { login_details } from '../../interface/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: UserService, private router: Router) {
    
  }

//  login(details:login_details){
//   console.log(details);
//   this.authService.loginUser(details).subscribe(res=>{
//     console.log(res);
//   })
login(loginForm: NgForm) {
  if (loginForm.valid) {
    const details: login_details = loginForm.value;
    console.log(details);
    this.authService.loginUser(details).subscribe(res => {
      console.log(res);
    });
  }
}
checkToken(token:string){
  // this.authService.checkToken(token).subscribe(res=>{
  //   console.log(res);
  // })
}
}

