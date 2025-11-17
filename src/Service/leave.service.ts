import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { Observable } from 'rxjs';


export interface LeaveRequestResponse {
  success: boolean;
  messages: string[];
  data: [LeaveRequest];
}
export interface LeaveFilterRequest {
  status?: string;
  startDate?: string;  // ISO string
  endDate?: string;    // ISO string
}
export interface UpdateLeaveStatusRequest {
  leaveId: number;
  newStatus: 'Approved' | 'Rejected';
  reviewedBy: number; // userId of admin
}
export interface LeaveBalance {
  leaveTypeId: number;
  leaveType: string;
  totalTakenDays: number;
  remainingDays: number;
}
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
export interface LeaveType {
  leaveTypeId: number;
  leaveTypeName : string;
}
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

   constructor(private http: HttpClient) {}
      getAllLeaves(UserId:any) {
        return this.http.get<LeaveRequestResponse>(`${environment.apiUrl}/api/Admin/Admin/ViewEmployeeLeaveRequest/${UserId}`);
      }
      filterLeaves(filter: LeaveFilterRequest): Observable<LeaveRequestResponse> {
        return this.http.post<LeaveRequestResponse>(`${environment.apiUrl}/api/Admin/Filter`, filter);
      }
      updateLeaveStatus(request: UpdateLeaveStatusRequest) {
        return this.http.post<LeaveRequestResponse>(`${environment.apiUrl}/api/Admin/UpdateLeaveStatus`, request);
      }
      getLeaveBalance(userId: string): Observable<LeaveBalance[]> {
        return this.http.get<LeaveBalance[]>(`${environment.apiUrl}/api/Employee/GetLeaveBalance/${userId}`);
      }
      applyLeave(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/Leave/AddLeaveApplication`, payload);
      }
      getLeaveTypes(userId:number): Observable<LeaveType[]> {
        return this.http.get<LeaveType[]>(`${environment.apiUrl}/api/Leave/LeaveTypes/${userId}`);
      }
}
