import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { EmployeeRegistrationComponent } from './admin/employee-registration/employee-registration.component';
import { LeaveRequestComponent } from './admin/leave-request/leave-request.component';
import { PasswordResetComponent } from './employee/password.reset/password.reset.component';
import { LeaveBalanceComponent } from './employee/leave-balance/leave-balance.component';
import { ApplyLeaveComponent } from './employee/apply-leave/apply-leave.component';
import { HolidayUploadComponent } from './admin/holiday-upload/holiday-upload.component';
import { HolidayViewComponent } from './employee/holiday-view/holiday-view.component';
import { CalendarViewComponent } from './employee/calendar-view/calendar-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'employee-dashboard', component: EmployeeDashboardComponent },
    { path: 'employee-registration', component: EmployeeRegistrationComponent },
    { path: 'leave-request', component: LeaveRequestComponent },
    { path: 'PasswordReset', component: PasswordResetComponent },
    { path: 'Employee/LeaveBalance', component: LeaveBalanceComponent },
    { path: 'Employee/ApplyLeaveComponent', component: ApplyLeaveComponent },
    { path: 'Admin/HolidayUploadComponent', component: HolidayUploadComponent },
    { path: 'Employee/HolidayView', component: HolidayViewComponent },
    { path: 'Employee/CalendarView', component: CalendarViewComponent}
];
