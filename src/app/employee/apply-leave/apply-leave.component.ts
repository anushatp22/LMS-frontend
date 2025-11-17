import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeaveService, LeaveType } from '../../../Service/leave.service';
import { AuthServiceService } from '../../../Service/auth-service.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../Service/toast.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [NotificationComponent, MenuComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss'
})
export class ApplyLeaveComponent {
 applyForm!: FormGroup;
  leaveTypeId: number | null = null;
  userId: any; 
  leaveType: string = '';
  allLeaveTypes: LeaveType[] = [];
   isPreselected: boolean = false;
  @Input() role: string | null = null;
  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthServiceService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

        this.applyForm = this.fb.group({
      leaveType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  

     this.route.queryParams.subscribe(params => {
      if (params['leaveTypeId'] && params['leaveType'] !== '') {
      this.leaveTypeId = +params['leaveTypeId'];
      this.leaveType = params['leaveType'];
      this.isPreselected = true;
      } else {
        this.isPreselected = false;
        this.leaveTypeId = null;
        this.leaveType = '';
      }
    });
    // Set the form value after getting query params
    // if (this.leaveTypeId) {
    //   this.applyForm.patchValue({
    //     leaveType: this.leaveTypeId
    //   });
    // }
  
    this.leaveService.getLeaveTypes(this.userId).subscribe({
      next: (res: LeaveType[]) => {
          this.allLeaveTypes = Array.isArray(res) ? res : [];
           console.log('Leave Types Response:', res); // ✅ Add this
    console.log('First Leave Type:', res[0]); 
           if (this.leaveTypeId && this.isPreselected) {
            setTimeout(() => {
        this.applyForm.patchValue({
          leaveType: this.leaveTypeId
        });
      }, 0);
    }
        },
      error: (err) => {
    console.error('Failed to fetch leave types:', err);
    this.allLeaveTypes = [];
  }
});


   
}


  submitApplication() {
    if (this.applyForm.invalid) return;

    const payload = {
      employeeId: this.userId,
      leaveTypeId: this.applyForm.value.leaveType,
      email: this.applyForm.value.email,
      startDate: this.applyForm.value.startDate,
      endDate: this.applyForm.value.endDate,
      reason: this.applyForm.value.reason,
      appliedAt: new Date()
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: (res) => {
        if (res) {
          this.applyForm.reset();
          this.toast.show('Leave application submitted successfully!', 'success');
        } else {
          this.toast.show('Failed to submit leave application', 'error');
        }
      },
      error: (err) => {console.error('Error applying leave:', err),
      this.toast.show('Error submitting leave application', 'error')
      }
    });
  }
}
