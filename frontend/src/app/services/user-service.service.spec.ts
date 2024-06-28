import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user-service.service';
import { User, token_details } from '../interface/interfaces';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', () => {
    const mockUser: User = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      firstName: 'Test',
      lastName: 'User',
      profilePhoto: 'profilePhotoUrl',
      createdAt: ''
    };

    service.addUser(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/user/addUser');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  });

  it('should login a user', () => {
    const mockCredentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'testToken' };

    service.loginUser(mockCredentials).subscribe(response => {
      expect(response.token).toEqual('testToken');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/user/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should get all users', () => {
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'testuser1',
        email: 'test1@example.com',
        password: 'password123',
        role: 'user',
        firstName: 'Test1',
        lastName: 'User1',
        profilePhoto: 'profilePhotoUrl1',
        createdAt: ''
      },
      {
        id: '2',
        username: 'testuser2',
        email: 'test2@example.com',
        password: 'password123',
        role: 'admin',
        firstName: 'Test2',
        lastName: 'User2',
        profilePhoto: 'profilePhotoUrl2',
        createdAt: ''
      }
    ];

    service.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/user/getUsers');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('should reset password', () => {
    const newPassword = 'newPassword123';
  
    service.resetPassword(newPassword).subscribe(response => {
      expect(response);
    });
  
    const req = httpTestingController.expectOne('http://localhost:3000/user/resetPassword');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({ newPassword });
    req.flush({});
  });
  
  it('should delete a user', () => {
    const userId = '1';
  
    service.deleteUser(userId).subscribe(response => {
      expect(response);
    });
  
    const req = httpTestingController.expectOne(`http://localhost:3000/user/deleteUser/${userId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
  

  it('should get user details', () => {
    const token = 'testToken';
    const mockDetails: token_details = {
      info: {
        id: 'uniqueId',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        profilePhoto: 'profilePhotoUrl'
      },
      error: {
        message: ''
      }
    };
  
    service.getUserDetails(token).subscribe(details => {
      expect(details).toEqual(mockDetails);
    });
  
    const req = httpTestingController.expectOne('http://localhost:3000/user/checkDetails');
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('token')).toEqual(token);
    req.flush(mockDetails);
  });
  
});
