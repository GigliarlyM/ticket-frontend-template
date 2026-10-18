import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  ticketForm: FormGroup;

  constructor(
    private ticketService: TicketService,
    private fb: FormBuilder
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const { title, description } = this.ticketForm.value;
      this.ticketService.addTicket(title, description);
      this.ticketForm.reset();
    }
  }
}
