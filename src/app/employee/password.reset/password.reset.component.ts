import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../Service/auth-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-password.reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password.reset.component.html',
  styleUrl: './password.reset.component.scss'
})
export class PasswordResetComponent {
    passwordResetForm!: FormGroup;
    employeeId!: number;
    email!: string;

  constructor(private authService: AuthServiceService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
     this.employeeId = params['employeeId'];
    //  this.email = params['email'];
    console.log('EmployeeId:', this.employeeId, 'Email:', this.email);
  });
    this.passwordResetForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.passwordResetForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.passwordResetForm.value;
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }
       // Payload to send to backend
      const resetPayload = {
        employeeId: this.employeeId,
        // email: this.email,
        newPassword: newPassword,
        oldPassword: oldPassword
      };
       this.authService.resetPassword(resetPayload).subscribe({
        next: (res) => {
          alert('Password updated successfully. Please login again.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Something went wrong while resetting password.');
        }
      });
    }
  }
}
