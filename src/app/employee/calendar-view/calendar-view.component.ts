import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [MenuComponent, NotificationComponent, CommonModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {
@Input() role: string | null = null;
  activeTab: string = 'myData'; // default active tab
}
