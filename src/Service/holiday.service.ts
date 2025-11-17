import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Holiday {
  id?: number;
  holidayDate: string; // "DD-MM-YYYY"
  holidayName: string;
  holidayType: string;
  year: number;
}
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }
   downloadTemplate(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/api/Holiday/DownloadHolidayTemplate`, { responseType: 'blob' });
  }
   uploadHolidayFile(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/api/Holiday/UploadHolidayFile`, formData);
  }
   getHolidays(companyId: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${environment.apiUrl}/api/Holiday/Company/${companyId}`);
  }
}
