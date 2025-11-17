import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MenuComponent, NotificationComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
