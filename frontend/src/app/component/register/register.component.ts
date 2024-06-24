
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  submitted = false;

  constructor(private userService: UserService) { }

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      const user = {
        id: this.generateId(),
        username: registerForm.value.username,
        email: registerForm.value.email,
        password: registerForm.value.password,
        role: 'user',
        firstName: registerForm.value.firstName,
        lastName: registerForm.value.lastName,
        profilePhoto: registerForm.value.profilePhoto || null
      };
      this.userService.addUser(user).subscribe(
        response => {
          console.log('User created successfully', response);
        },
        error => {
          console.error('Error creating user', error);
        }
      );
    }
  }

  private generateId(): string {
    // Implement your ID generation logic here
    return 'some-unique-id';
  }
}

