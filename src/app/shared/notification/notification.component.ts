import { Component, HostListener } from '@angular/core';
import { Notification, NotificationService } from '../../../Service/notification.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../Service/auth-service.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
notifications: Notification[] = [];
showDropdown: boolean = false;
userId!: any;
showProfileDropdown: boolean = false;

  constructor(private notificationService: NotificationService, private authService: AuthServiceService) {}

  ngOnInit(): void {
     const Id = this.authService.getUserId();// replace with real user id
    if (Id) {
    this.userId = Id;
    this.notificationService.getNotifications(this.userId).subscribe({
       next: res => {
    // res.data is the actual array of notifications
    this.notifications = Array.isArray(res.data) ? res.data : [];
  },
  error: err => {
    console.error('Failed to fetch notifications', err);
    this.notifications = [];
  }
    });
  } else {
    console.error("User ID not found in token");
  }

    this.notificationService.getNotificationStream().subscribe(notification => {
      this.notifications.unshift(notification);
    });
  }

   /** Mark as read when clicked */
  openNotification(notification: Notification) {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.isRead = true;
      });
    }
    // You can also navigate or show details here
  }

  get unreadCount(): number {
  return Array.isArray(this.notifications) 
    ? this.notifications.filter(n => !n.isRead).length 
    : 0;
}
 toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

   /** Close dropdown if click outside */
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-notification')) {
      this.showDropdown = false;
    }
  }

  toggleProfileDropdown() {
  this.showProfileDropdown = !this.showProfileDropdown;
}

openSettings() {
  // Implement navigation to settings page if required
  console.log("Settings clicked");
  this.showProfileDropdown = false;
}

logout() {
  this.authService.clearAccessToken(); // clear token
  this.showProfileDropdown = false;
  // Navigate to login page
  window.location.href = '/login';
}
}
