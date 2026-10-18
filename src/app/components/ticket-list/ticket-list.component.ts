import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  newTitle = '';
  newDescription = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  addTicket(): void {
    if (!this.newTitle || this.newTitle.trim() === '') {
      alert('Title is required');
      return;
    }
    this.ticketService.addTicket(this.newTitle, this.newDescription);
    this.newTitle = '';
    this.newDescription = '';
  }
}
