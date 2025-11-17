import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ChevronLeft, ChevronRight } from 'lucide-angular';
import { AuthServiceService } from '../../../Service/auth-service.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  // role: string | null = null;
  constructor(private authService: AuthServiceService) {}
 @Input() logoText: string = 'Menu';
 @Input() role: string | null = null;
  isCollapsed: boolean = false; 
  icons = { ChevronLeft, ChevronRight };
  menuItemsAdmin = [
  { label: 'Overview', route: '/admin/overview', icon: '📊' },
  { label: 'Manage Users', route: '/admin/users', icon: '👥' },
  { label: 'Leave Requests', route: '/leave-request', icon: '📅' },
  { label: 'Reports', route: '/admin/reports', icon: '📑' },
  { label: 'Employee Registration', route: '/employee-registration', icon: '📝' },
  { label: 'Holiday Calendar', route: '/Admin/HolidayUploadComponent', icon: '🎉' }
];

menuItemsEmployee = [
  { label: 'Dashboard', route: '/employee/dashboard', icon: '📊' },
  { label: 'My Tasks', route: '/employee/tasks', icon: '✅' },
  { label: 'Leave Balance', route: '/Employee/LeaveBalance', icon: '📅' },
  { label: 'Apply Leave', route: '/Employee/ApplyLeaveComponent', icon: '📝' },
  { label: 'Holidays', route: '/Employee/HolidayView', icon: '🎉' },
  { label: 'Calendar', route: '/Employee/CalendarView', icon: '🗓️' }
];

menuItems: any[] = [];

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
  ngOnInit(): void {
   if (typeof window !== 'undefined') {
    this.role = localStorage.getItem('userRole');
  }
     if (this.role === 'Admin') {
    this.menuItems = this.menuItemsAdmin;
  } else if (this.role === 'Employee') {
    this.menuItems = this.menuItemsEmployee;
  }
  }
}
