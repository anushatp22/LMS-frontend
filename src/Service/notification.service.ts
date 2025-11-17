import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isRead: boolean;
  createdAt?: string;
  userId: any;
}
export interface NotificationResponse {
  data: Notification[];
  success: boolean;
  messages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notificationSubject = new Subject<Notification>();

  constructor(private http: HttpClient) {}

  getNotifications(userId: string): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${environment.apiUrl}/api/Employee/GetNotifications/${userId}`);
  }

  addNotification(notification: Omit<Notification, 'id'>): Observable<Notification> {
    return this.http.post<Notification>(`${environment.apiUrl}/api/Employee/AddNotification`, notification);
  }

  markAsRead(id: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/Employee/MarkAsRead/${id}`, {});
  }

  // Real-time like notifications in Angular
  notify(notification: Notification) {
    this.notificationSubject.next(notification);
  }

  getNotificationStream(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }
}
