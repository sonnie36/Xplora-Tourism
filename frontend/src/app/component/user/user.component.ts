import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { token_details } from '../../interface/interfaces';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: token_details['info'] | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserDetails(token).subscribe(details => {
        if (details.info) {
          this.user = details.info;
        } else {
          console.log('Failed to fetch user details:', details.error?.message);
        }
      });
    } else {
      console.log('No token found in local storage');
    }
  }
}
