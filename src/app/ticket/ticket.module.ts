import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketService } from './ticket.service';

@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    TicketService
  ],
  exports: [
    TicketListComponent
  ]
})
export class TicketModule { }
