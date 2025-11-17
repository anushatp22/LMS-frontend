import { Component } from '@angular/core';
import { ToastMessage, ToastService } from '../../../Service/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState.subscribe(msg => {
      this.messages.push(msg);
console.log('ToastService created');
      // Auto remove after 3 seconds
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    });
  }
}
