import { Component, ElementRef, ViewChild } from '@angular/core';
import { HolidayService } from '../../../Service/holiday.service';
import { ToastService } from '../../../Service/toast.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthServiceService } from '../../../Service/auth-service.service';

@Component({
  selector: 'app-holiday-upload',
  standalone: true,
  imports: [MenuComponent, NotificationComponent],
  templateUrl: './holiday-upload.component.html',
  styleUrl: './holiday-upload.component.scss'
})
export class HolidayUploadComponent {
  
  
  selectedFile: File | null = null;
  companyId: any | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private holidayService: HolidayService, private toast: ToastService, private authService: AuthServiceService) {}
 


  downloadTemplate() {
    this.holidayService.downloadTemplate().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HolidayTemplate.xlsx';
        a.click();
      },
      error: () => {
        this.toast.show('Template download failed.', 'error');
      }
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['.csv', '.xlsx'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        this.toast.show('Only .csv or .xlsx files are allowed.', 'error');
        this.selectedFile = null;
        event.target.value = ''; // reset input
        return;
      }

      this.selectedFile = file;
      this.toast.show(`Selected: ${file.name}`, 'info');
    }
  }


  uploadFile() {
    if (!this.selectedFile) {
      this.toast.show('Please select a valid file before uploading.', 'warning');
      return;
    }
    this.companyId = this.authService.getCompanyId(); // fetch from token
     const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('companyId', this.companyId); // pass companyId along with file

  this.holidayService.uploadHolidayFile(formData).subscribe({
    next: () => {this.toast.show('Holiday file uploaded successfully!', 'success'),
     // Reset file input
        this.selectedFile = null;
        this.fileInput.nativeElement.value = '';
    },
    error: () => {
      this.toast.show('Upload failed. Please try again.', 'error')
    }
  });
  }
}
