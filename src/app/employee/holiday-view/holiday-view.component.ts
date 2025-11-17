import { Component, Input } from '@angular/core';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthServiceService } from '../../../Service/auth-service.service';
import { HolidayService } from '../../../Service/holiday.service';
import { ToastService } from '../../../Service/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-view',
  standalone: true,
  imports: [MenuComponent, NotificationComponent, CommonModule],
  templateUrl: './holiday-view.component.html',
  styleUrl: './holiday-view.component.scss'
})
export class HolidayViewComponent {
  holidays: any = [];
  companyId: any;
@Input() role: string | null = null;
constructor(private authService: AuthServiceService, private holidayService: HolidayService,private toast: ToastService) {}
ngOnInit(): void {
  // this.role = localStorage.getItem('userRole');
  this.companyId = this.authService.getCompanyId();
  this.loadHolidays();
}
loadHolidays() {
    this.holidayService.getHolidays(this.companyId).subscribe({
      next: (res: any) => {
        this.holidays = res.data || [];
      },
      error: err => {
        this.toast.show('Internal Server Error', 'error');
        console.error('Failed to fetch holidays', err);
      }
    });
  }
}
