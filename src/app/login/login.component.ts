import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Service/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  loginForm!: FormGroup;
console: any;
  userRole: string = '';
  constructor(private fb: FormBuilder, 
              private authService: AuthServiceService, 
              private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
// ...existing code...
onSubmit(): void {
  if (this.loginForm.valid) {
    const loginData = this.loginForm.value;
    console.log('Login data:', loginData);
    // Example: Call your AuthService to send loginData to backend
    this.authService.login(loginData).subscribe({
      next: (response) => {
        
          if (response.data.forcePasswordChange) {
            // Redirect to password change page
            this.router.navigate(['/PasswordReset'], {
    queryParams: {
      employeeId: response.data.employeeId,
      email: response.data.email
    }
  });
            return;
          }
          if (response.success) {
          const token = response.data.accessToken;
      this.authService.setAccessToken(response.data.accessToken);
       // Decode JWT to check role
          interface JwtPayload {
            Role: string;
          }
          const decoded =  jwt_decode<JwtPayload>(token);
          const role = decoded.Role;
          localStorage.setItem('userRole', role);
          this.authService.setUserRole(role);
          if (decoded.Role === 'Admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (decoded.Role === 'Employee') {
            this.router.navigate(['/employee-dashboard']);
          } else {
            // fallback
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => {
        // Handle error
      }
    });
  } else {
    this.loginForm.markAllAsTouched(); // Show validation errors
  }
}
// ...existing code...
}
