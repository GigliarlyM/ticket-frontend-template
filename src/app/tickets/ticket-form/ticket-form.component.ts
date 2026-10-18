import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {
  ticketCreated = output<{ title: string; description: string }>();

  title = '';
  description = '';

  onSubmit(): void {
    if (!this.title.trim()) {
      return;
    }
    this.ticketCreated.emit({ title: this.title, description: this.description });
    this.title = '';
    this.description = '';
  }
}
