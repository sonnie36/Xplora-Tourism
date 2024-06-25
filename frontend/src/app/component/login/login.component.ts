import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { login_details } from '../../interface/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {
    
  }
  login(form: NgForm): void {
    if (form.valid) {
      const details: login_details = {
        email: form.value.email,
        password: form.value.password
      };

      this.userService.loginUser(details).subscribe(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Store the token in local storage
          console.log('Login successful!');
          this.router.navigate(['/user']); // Redirect to a specific route on successful login
        } else {
          console.log('Login failed:', response.error);
        }
      });
    }
  }

}

