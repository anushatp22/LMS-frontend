import { Component, Input } from '@angular/core';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { LeaveBalance, LeaveService } from '../../../Service/leave.service';
import { AuthServiceService } from '../../../Service/auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-balance',
  standalone: true,
  imports: [NotificationComponent, MenuComponent, CommonModule],
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.scss'
})
export class LeaveBalanceComponent {
  leaveTypes: LeaveBalance[] = [];
  userId: any;
  @Input() role: string | null = null;

 constructor(private leaveService: LeaveService, 
            private authService: AuthServiceService, 
            private router: Router) {}
ngOnInit(): void {
      this.userId = this.authService.getUserId();
      if (this.userId) {
      this.leaveService.getLeaveBalance(this.userId).subscribe({
        next: (res: any) => {
          if (res.success && Array.isArray(res.data)) {
            this.leaveTypes = res.data
          }
          // this.leaveTypes = [];
        },
        error: (err) => {
          console.error('Failed to fetch leave balance:', err);
          this.leaveTypes = [];
        }
      });
    }
  }

    applyLeave(leave: any) {
    this.router.navigate(['/Employee/ApplyLeaveComponent'], {
      queryParams: { leaveTypeId: leave.leaveTypeId, 
      leaveType: leave.leaveType,
      remainingDays: leave.remainingDays,
      totalTakenDays: leave.totalTakenDays,
    } // ✅ pass as query param
    });
  }
}
