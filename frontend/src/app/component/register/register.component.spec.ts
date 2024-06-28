import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interface/interfaces';
import { CommonModule } from '@angular/common';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: any;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['addUser']);
    activatedRouteStub = {};

    await TestBed.configureTestingModule({
      imports: [FormsModule,CommonModule, RouterLink,RegisterComponent],
      declarations: [],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user successfully', () => {
    const mockForm: NgForm = {
      valid: true,
      value: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role:'user',
        firstName: 'Test',
        lastName: 'User',
        profilePhoto: 'profilePhotoUrl'
      }
    } as NgForm;
    const mockUser: User = {
      id: 'some-unique-id',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      firstName: 'Test',
      lastName: 'User',
      profilePhoto: 'profilePhotoUrl',
      createdAt: '',
    };

    userServiceSpy.addUser.and.returnValue(of(mockUser));

    component.onSubmit(mockForm);

    expect(userServiceSpy.addUser.calls.count()).toBe(1);
    expect(userServiceSpy.addUser.calls.first().args[0]).toEqual(jasmine.objectContaining({
      username: 'testuser',
      email: 'test@example.com'
    }));
  });

  it('should handle registration error', () => {
    const mockForm: NgForm = {
      valid: true,
      value: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        profilePhoto: 'profilePhotoUrl'
      }
    } as NgForm;
    const errorResponse = new Error('Registration failed');
    userServiceSpy.addUser.and.returnValue(throwError(() => errorResponse));

    spyOn(console, 'error');

    component.onSubmit(mockForm);

    expect(userServiceSpy.addUser.calls.count()).toBe(1);
    expect(console.error).toHaveBeenCalledWith('Error creating user', errorResponse);
  });
});
