import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../Service/admin.service';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../Service/notification.service';
import { AuthServiceService } from '../../../Service/auth-service.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { ToastService } from '../../../Service/toast.service';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [MenuComponent, CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss'
})
export class EmployeeRegistrationComponent {
    registrationForm!: FormGroup;
    userId!: any;

  constructor(
    private fb: FormBuilder,
    private registrationService: AdminService,
    private notificationService: NotificationService,
    private authService: AuthServiceService,
    private toast: ToastService
  ) {}

    ngOnInit(): void {
      const Id = this.authService.getUserId();// replace with real user id
    if (Id) {
    this.userId = Id;
    }
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      employeeId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      joiningDate: ['', Validators.required],
      gender: ['', Validators.required],
       passwordHash: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

   onSubmit(): void {
     if (this.registrationForm.valid) {
    const payload = this.registrationForm.value;

    this.registrationService.registerEmployee(payload).subscribe({
      next: (res) => {
        this.registrationForm.reset();
        // Save notification to backend AND show live
          const notification: Partial<Notification> = {
          userId: this.userId,
          message: `Employee ${payload.name} with employeeId ${payload.employeeId} registered successfully!`,
          type: 'success',
          isRead: false,
        };

        this.notificationService.addNotification(notification as Notification).subscribe({
          next: (savedNotification) => {
            // show immediately in UI
            this.notificationService.notify(savedNotification);
          },
          error: (err) => {
            console.error('Failed to save notification', err);
          }
        });
      },
      error: (err) => {
        // console.error('Error registering employee', err);
        this.toast.show(`Failed to register employee: ${err}`, "error");
      }
    });
  }
  }
}
