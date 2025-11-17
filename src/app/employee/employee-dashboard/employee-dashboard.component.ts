import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [MenuComponent, NotificationComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent {
// role: string | null = null;
@Input() role: string | null = null;
ngOnInit(): void {
  this.role = localStorage.getItem('userRole');
}
}
