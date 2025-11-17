import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveService, LeaveRequestResponse, LeaveFilterRequest, UpdateLeaveStatusRequest  } from '../../../Service/leave.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { AuthServiceService } from '../../../Service/auth-service.service';
import { NotificationService } from '../../../Service/notification.service';
import { ToastService } from '../../../Service/toast.service';

interface LeaveRequest {
  leaveRequestId: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
  employeeId: number;
}

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuComponent, NotificationComponent],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})

export class LeaveRequestComponent {
 leaveRequests: LeaveRequest[] = [];
  filteredRequests: LeaveRequest[] = [];
  
  statusFilter: string = '';
  dateFilter: string = '';
  // UserId = localStorage.getItem('UserId');
  userId!: any;


  constructor(private leaveService: LeaveService, private authService: AuthServiceService, private notificationService: NotificationService, private toast: ToastService) {}

  ngOnInit(): void {
    const Id = this.authService.getUserId();// replace with real user id
    if (Id) {
    this.userId = Id;
    }
    this.loadLeaveRequests();
    // this.applyFilters();
  }

  loadLeaveRequests() {
    this.leaveService.getAllLeaves(this.userId).subscribe({
    next: (res: LeaveRequestResponse) => {
      if (res.success) {
        this.leaveRequests = res.data || [];
        this.applyFilters(); // optional filtering in component
      } else {
        // console.error('Failed to load leaves:', res.messages);
        this.toast.show(`No leave requests found: ${res.messages}`,"error")

      }
    },
    error: (err) => {
      console.error('HTTP error:', err);
    }
  });
  }
    applyFilters() {
      // If no filters, just show all
          if (!this.statusFilter && !this.dateFilter) {
            this.filteredRequests = [...this.leaveRequests];
            return;
          }

            const filter: LeaveFilterRequest  = {};

          if (this.statusFilter) {
            filter.status = this.statusFilter;
          }
          if (this.statusFilter.toLowerCase() === 'all')
          {
            this.loadLeaveRequests();
          }
          if (this.dateFilter) {
            filter.startDate = this.dateFilter;
            filter.endDate = this.dateFilter; // if your API supports date range
          }

          this.leaveService.filterLeaves(filter).subscribe({
            next: (res) => {
              if (res.success) {
                this.filteredRequests = res.data;
              } else {
                  // If no data found, show empty table
                  this.filteredRequests = [];
                  // console.warn('No leave requests found:', res.messages);
                  this.toast.show(`No leave requests found: ${res.messages}`,"error")
                }
            },
            error: (err) => 
              {
                this.filteredRequests = [];
                console.error('HTTP error:', err)
              }
          });
        }
    approveLeave(leave: LeaveRequest) {
          const request: UpdateLeaveStatusRequest = {
            leaveId: leave.leaveRequestId,
            newStatus: 'Approved',
            reviewedBy: this.userId // the admin reviewing
          };

          this.leaveService.updateLeaveStatus(request).subscribe({
            next: (res) => {
              if (res.success) {
                console.log('Leave approved successfully');
                this.loadLeaveRequests();

                  const notification = {
                            userId: leave.employeeId,
                            message: `Your leave request has been approved.`,
                            type: 'success' as 'success',
                            isRead: false,
                          };
                  
                          this.notificationService.addNotification(notification).subscribe({
                            next: (savedNotification) => {
                              // show immediately in UI
                              this.notificationService.notify(savedNotification);
                            },
                            error: (err) => {
                              console.error('Failed to add notification:', err);
                    }
              })
             }
              else {
                this.toast.show("Failed to approve leave", "error");
              }
            },
            error: (err) => this.toast.show("Server error while approving leave", "error")
          });
        }


    rejectLeave(leave: LeaveRequest) {
      const request: UpdateLeaveStatusRequest = {
            leaveId: leave.leaveRequestId,
            newStatus: 'Rejected',
            reviewedBy: this.userId // the admin reviewing
          };

          this.leaveService.updateLeaveStatus(request).subscribe({
            next: (res) => {
              if (res.success) {
                console.log('Leave rejected successfully');
                this.loadLeaveRequests(); // refresh table
                const notification = {
                            userId: leave.employeeId,
                            message: `Your leave request has been rejected.`,
                            type: 'success' as 'success',
                            isRead: false,
                          };
                          this.notificationService.addNotification(notification).subscribe({
                            next: (savedNotification) => {
                              // show immediately in UI
                              this.notificationService.notify(savedNotification);
                            },
                            error: (err) => {
            console.error('Failed to add notification:', err);
          }
              })
              } else {
                this.toast.show("Failed to reject leave", "error");
              }
            },
            error: (err) => this.toast.show("Server error while rejecting leave", "error")
          });
    }
}
