import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { AuthServiceService } from './auth-service.service';

export interface RegisterEmployee {
  name: string;
  employeeId: string;
  email: string;
  department: string;
  role: string;
  joiningDate: string;  // send as string to match JSON date format
  gender: string;
  companyId: string;
  passwordHash: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  registerEmployee(data: RegisterEmployee): Observable<any> {
    const token = this.authService.getAccessToken();
    const decoded: any = this.authService.decodeToken(token);
    const companyId = decoded?.CompanyId; //depends on your claim name

    // Merge companyId into payload
    const payload = { ...data, companyId };
    return this.http.post(`${environment.apiUrl}/api/Admin/RegisterEmployee`, payload);
  }
}
