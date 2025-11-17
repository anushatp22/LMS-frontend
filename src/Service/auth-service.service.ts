import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';


export interface LoginResponseData {
  accessToken: string;
  // refreshToken: string;
   forcePasswordChange?: boolean;
   employeeId? : number;
   email? : string;
}

export interface ApiResponse<T> {
  success: boolean;
  messages: string[];
  data: T;
  accessToken:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private accessToken: string | null = null;
// private refreshTokenValue: string | null = null;
private userRole: string | null = null;
  constructor(private http: HttpClient) {}
    login(credentials: any) {
      return this.http.post<ApiResponse<LoginResponseData>>(`${environment.apiUrl}/api/Employee/User/Login`, credentials, { withCredentials: true });
    }
    setAccessToken(token: string) {
      this.accessToken = token;
      if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("accessToken", token);
      }
    }

    getAccessToken(): string | null {
      if (!this.accessToken && typeof window !== 'undefined' && window.localStorage) {
      this.accessToken = localStorage.getItem("accessToken");
    }
      return this.accessToken;
    }

      clearAccessToken() {
    this.accessToken = null;
     if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem("accessToken");
     }
  }

   setUserRole(role: string) {
     if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('userRole', role);
     }
  }

  getUserRole(): string | null {
     if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('userRole');
     }
  return null;
  }
    getUserProfile() {
      return this.http.get<{ username: string, role: string }>('/api/auth/me', { withCredentials: true });
    }

   decodeToken(token: string | null): any {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }
  resetPassword(payload: any): Observable<any> {
  return this.http.patch(`${environment.apiUrl}/api/Employee/User/${payload.employeeId}/ResetPassword`, payload);
}
getUserId(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      // Assuming userId is stored as "id" or "sub" in JWT payload
      return decoded.Id || decoded.sub || null;
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  }

  getCompanyId(): string | null {
  const token = this.getAccessToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    // Assuming companyId is stored as "companyId" or "CompanyId" in the JWT payload
    return decoded.companyId || decoded.CompanyId || null;
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

}
