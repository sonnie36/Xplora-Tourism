import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user-service.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['loginUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {};

    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockForm: NgForm = {
      valid: true,
      value: { email: 'test@example.com', password: 'password123' }
    } as NgForm;
    userServiceSpy.loginUser.and.returnValue(of({ token: 'testToken' }));

    component.login(mockForm);

    expect(userServiceSpy.loginUser.calls.count()).toBe(1);
    expect(localStorage.getItem('token')).toBe('testToken');
    expect(component.loginSuccess).toBe('Login successful!');
    expect(component.loginError).toBeNull();
    setTimeout(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/','user']);
    },3000)
  });

  it('should show error message on login failure', () => {
    const mockForm: NgForm = {
      valid: true,
      value: { email: 'test@example.com', password: 'password123' }
    } as NgForm;
    userServiceSpy.loginUser.and.returnValue(of({ error: 'Invalid credentials' }));

    component.login(mockForm);

    expect(userServiceSpy.loginUser.calls.count()).toBe(1);
    expect(component.loginSuccess).toBeNull();
    expect(component.loginError).toBe('Invalid credentials');
  });
});
